$(document).on("click", ".view-invoice", function () {
    // Retrieve data attributes from the clicked element
    var invoiceId = $(this).data("invoice-id");
    var userId = $(this).data("user-id");
    var transactionId = $(this).data("transaction-id");
    var subscriptionId = $(this).data("subscription-id");
    var validFrom = $(this).attr("data-validFrom");
    var validTo = $(this).attr("data-validTo");
    var amount = $(this).data("amount");
    const status = $(this).data("status");
    var discountId = $(this).data("discount_id");

    // Define month and weekday names
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    console.log(validFrom);

    function formateDate(dateString) {
        // Extract components from the date
        var date = new Date(dateString);

        var day = date.getDate();
        var month = monthNames[date.getMonth()];
        var year = date.getFullYear();
        var weekday = dayNames[date.getDay()];
        var hours = date.getHours();
        var minutes = date.getMinutes().toString().padStart(2, '0');
        var AmPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        return `${month} ${day} ${year} (${weekday}), ${hours}:${minutes} ${AmPm}`;
    }

    // Update badge color and text based on status
    if (status === true) {
        $("#exampleModal .badge").removeClass("badge-danger").addClass("badge-success").text("Success");
    } else {
        $("#exampleModal .badge").removeClass("badge-success").addClass("badge-danger").text("Failed");
    }

    let invoiceDate = document.getElementById("invoiceDate");
    let invoiceID = document.getElementById("invoiceID");
    let subStandard = document.getElementById("subStandard");
    let subResolution = document.getElementById("subResolution");
    let subSound_quality = document.getElementById("subSound_quality");
    let subSupported_devices = document.getElementById("subSupported_devices");
    let subConnection = document.getElementById("subConnection");
    let subDate = document.getElementById("subDate");
    let subAmount = document.getElementById("subAmount");

    invoiceDate.innerHTML = "<strong>Invoice Date: </strong>" + formateDate(validFrom);
    invoiceID.innerHTML = "<strong>Invoice ID: </strong>#" + invoiceId;


    // Get subscription data
    $.ajax({
        url: 'singleSubscription',
        type: 'GET',
        data: { subscriptionId },
        success: function (data) {
            subStandard.innerText = data.title;
            subResolution.innerText = data.resolution;
            subSound_quality.innerText = data.sound_quality;
            subSupported_devices.innerText = data.supported_devices;
            subConnection.innerText = data.connection;
            subDate.innerText = formateDate(validFrom) + " - " + formateDate(validTo);
            subAmount.innerText = "₹" + amount;
        }
    });

    // Show the modal after data is successfully populated
    var exampleModal = new bootstrap.Modal(document.getElementById("exampleModal"));
    exampleModal.show();

});
