$(document).on("click", ".view-invoice", function () {
    // Retrieve data attributes from the clicked element
    var invoiceId = $(this).data("invoice-id");
    // var transactionId = $(this).data("transaction-id");
    var orderDate = new Date($(this).data("order-date"));
    var totalAmount = $(this).data("total");
    const status = $(this).data("status");
    var userId = $(this).data("user_id");
    var discountId = $(this).data("discount_id");

    // Define month and weekday names
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Extract components from the date
    var day = orderDate.getDate();
    var month = monthNames[orderDate.getMonth()];
    var year = orderDate.getFullYear();
    var weekday = dayNames[orderDate.getDay()];
    var hours = orderDate.getHours();
    var minutes = orderDate.getMinutes().toString().padStart(2, '0');
    var AmPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    // Format the date string
    var formattedDate = `${month} ${day} ${year} (${weekday}), ${hours}:${minutes} ${AmPm}`;

    // Update badge color and text based on status
    if (status === true) {
        $("#exampleModal .badge").removeClass("badge-danger").addClass("badge-success").text("Success");
    } else {
        $("#exampleModal .badge").removeClass("badge-success").addClass("badge-danger").text("Failed");
    }

    // Discount
    if (discountId) {
        $.ajax({
            url: '/api/discount/single',
            type: 'GET',
            data: { discountId: discountId },
            success: function (data) {
                $("#discount").html("$" + parseFloat(data.discountPrice).toFixed(2));
                $("#total").html("$" + ((parseFloat(totalAmount) - parseFloat(data.discountPrice)).toFixed(2)));
            }
        })
    } else {
        $("#discount").html("$" + 0);
        $("#total").html("$" + parseFloat(totalAmount).toFixed(2));
    }

    // Populate modal fields with retrieved data
    // $("#transactionId").text(transactionId);
    $("#orderDate").empty();
    $("#subTotal").empty();
    $("#orderDate").html("<strong>Order Date: </strong>" + formattedDate);
    $("#subTotal").text("$" + parseFloat(totalAmount).toFixed(2));

    $("#status").text(status);

    // Fetch user data with AJAX
    $.ajax({
        url: '/getUser',
        type: 'GET',
        data: { userId: userId },
        success: function (data) {
            $("#userData").html(
                data.address.map(address =>
                    address.isDefault ?
                        `<div class="mb-2" style="display: inline-block; width: auto; text-align: left">
                            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px">${address.fullName}</div>
                            <div>${address.no}, ${address.street}</div>
                            <div>${address.landMark}</div>
                            <div>${address.city}, ${address.state}</div>
                            <div>${address.country}-${address.zipCode}</div>
                        </div>`
                        : ""
                ).join("")
            );
            $("#userPhone").html("<strong>Phone: </strong>" + data.number);
        },
        error: function (error) {
            console.error("Error fetching user data:", error);
        }
    });

    // Clear the product list in case of any previous data
    $("#productList").empty();

    // Fetch invoice details using AJAX
    $.ajax({
        url: "/api/invoice-details/" + invoiceId,
        method: "GET",
        success: function (response) {
            // Create the table structure first
            let tableHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;" class="table table-hover">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #212529">Name</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #212529">Quantity</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #212529">Price</th>
                        <th style="padding: 10px; border: 1px solid #ddd; text-align: left; background-color: #212529">Total</th>
                    </tr>
                </thead>
                <tbody>
            `;

            // Iterate over the response data and append rows
            response.forEach(function (detail) {
                tableHtml += `
                <tr>
                        
                    <td style="padding: 10px; border: 1px solid #ddd;">
                    <img src="img/productImages/${detail.productImage}" 
                             alt="Product Image" 
                             style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 5px;">${detail.productName}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${detail.qty}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">$${detail.price.toFixed(2)}</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">$${(detail.price * detail.qty).toFixed(2)}</td>
                </tr>
                `;
            });

            // Close the table structure
            tableHtml += `</tbody></table>`;

            // Append the full table to the #productList
            $("#productList").html(tableHtml);

            // Show the modal after data is successfully populated
            var exampleModal = new bootstrap.Modal(document.getElementById("exampleModal"));
            exampleModal.show();
        },
        error: function () {
            alert("Failed to fetch invoice details.");
        },
    });

});
