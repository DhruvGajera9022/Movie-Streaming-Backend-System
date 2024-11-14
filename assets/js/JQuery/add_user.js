<script>
    $(document).ready(function () {

        $.ajax({
            url: '/getRoles',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    let roleOptions = '<option value="">Select Role</option>';
                    const userRole = '<%= (user && user.role) ? user.role : "" %>';
                    data.forEach(function (role) {
                        if (role.title) {
                            const selected = `${role.id}` === userRole ? 'selected' : '';
                            roleOptions += `<option value="${role.id}" ${selected}>${role.title}</option>`;
                        }
                    });

                    $('#role').html(roleOptions);
                } else {
                    $('#role').html('<option disabled>No roles available</option>');
                }
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch roles:', error);
                $('#role').html('<option disabled>Failed to load roles</option>');
            }
        });
          });
</script>