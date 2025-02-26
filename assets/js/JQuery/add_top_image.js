<script>
    $(document).ready(function () {

        $.ajax({
            url: '/getCategory',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    const productCategory = '<%= (topImage && topImage.category) ? topImage.category : "" %>';
                    let categoryOptions = '';

                    const selectedCategories = Array.isArray(productCategory) ? productCategory : productCategory.split(',');

                    data.forEach(function (category) {
                        if (category.name) {
                            const selected = selectedCategories.includes(category.id.toString()) ? 'selected' : '';
                            categoryOptions += `<option value="${category.id}" ${selected}>${category.name}</option>`;
                        }

                    });

                    $('#category').html(categoryOptions);
                } else {
                    $('#category').html('<option disabled>No category available</option>');
                }
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch categories:', error);
                $('#category').html('<option disabled>Failed to load category</option>');
            }
        })
    });
</script>