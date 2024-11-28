<script>
    $(document).ready(function () {

        $.ajax({
            url: '/getCategory',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    let categoryOptions = '<option value="">Select Category</option>';
                    const productCategory = '<%= (movie && movie.genre_ids) ? movie.genre_ids : "" %>';
                    data.forEach(function (category) {
                        if (category.name) {
                            const selected = `${category.id}` === productCategory ? 'selected' : '';
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
        });
});
</script>