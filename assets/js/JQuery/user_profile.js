<script>
    $(document).ready(function () {
        $.ajax({
            url: '/getProfile',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const addressOptions = $('#addressOptions');
                
                data.forEach(function (address) {
                    const isChecked = address.isDefault ? 'checked' : '';
                    console.log(address.isDefault);
                    const radioButton = `
                        <div class="form-check mb-3 p-3 border rounded shadow-sm">
                            <input class="form-check-input ml-1" type="radio" name="address" id="address-${address.id}" value="${address.id}" ${isChecked}>
                            <label class="form-check-label fw-bold ml-4" for="address-${address.id}">
                                ${address.fullName}
                                <div class="text-muted ml-6">
                                    ${address.no}, ${address.street}, ${address.landMark}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country} 
                                    <a class="text-primary edit-address" 
                                        data-id="${address.id}" 
                                        data-fullname="${address.fullName}" 
                                        data-number="${address.number}" 
                                        data-no="${address.no}" 
                                        data-street="${address.street}" 
                                        data-landmark="${address.landMark}" 
                                        data-city="${address.city}" 
                                        data-state="${address.state}" 
                                        data-country="${address.country}" 
                                        data-zipcode="${address.zipCode}" 
                                        data-type="${address.type}" 
                                        data-isdefault="${address.isDefault}">
                                        <i class="fas fa-edit ml-1"></i>
                                    </a> 
                                    <form action="/address/delete/${address.id}" method="POST" style="display: inline" onsubmit="return confirm('Are you sure?')">
                                        <button type="submit" style="background: none; border: none; cursor: pointer">
                                            <i class="fas fa-trash ml-1" style="color: red"></i>
                                        </button>
                                    </form>
                                </div>
                            </label>
                        </div>
                    `;
                    addressOptions.append(radioButton);
                });
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch addresses:', error);
                $('#addressOptions').html('<div>Failed to load addresses</div>');
            }
        });

        $(document).on('click', '.edit-address', function() {
            const id = $(this).data('id');
            const fullName = $(this).data('fullname');
            const number = $(this).data('number');
            const no = $(this).data('no');
            const street = $(this).data('street');
            const landmark = $(this).data('landmark');
            const city = $(this).data('city');
            const state = $(this).data('state');
            const country = $(this).data('country');
            const zipCode = $(this).data('zipcode');
            const type = $(this).data('type');
            const isDefault = $(this).data('isdefault');

            $('#id').val(id);
            $('#fullName').val(fullName);
            $('#number').val(number);
            $('#no').val(no);
            $('#street').val(street);
            $('#landMark').val(landmark);
            $('#city').val(city);
            $('#state').val(state);
            $('#country').val(country);
            $('#zipCode').val(zipCode);
            $('#type').val(type);
            $('#isDefault').prop('checked', isDefault === true);

            $('#exampleModal').modal('show');
        });


        $(document).on('click', '#btnModel', function() {
            $('#id').val('');
            $('#fullName').val('');
            $('#number').val('');
            $('#no').val('');
            $('#street').val('');
            $('#landMark').val('');
            $('#city').val('');
            $('#state').val('');
            $('#country').val('');
            $('#zipCode').val('');
            $('#type').val('');
            $('#isDefault').prop('checked', false);
        
            $('#exampleModal').modal('show');
        });
    });

function getCookie(name) {
            let cookieArr = document.cookie.split(";");
            for (let i = 0; i < cookieArr.length; i++) {
              let cookiePair = cookieArr[i].split("=");
              if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
              }
            }
            return null;
          }

          $(document).ready(function () {
            const userDataCookie = getCookie('userData');

            if (userDataCookie) {
              const userData = JSON.parse(decodeURIComponent(userDataCookie.slice(2)));

              const fullName = userData.fullName;
              const image = userData.image;
              const role = userData.role;

              if (fullName) {
                $('#UserName').text(fullName)
              }
              debugger

              if (image && image.startsWith('image')) {
                $('#UserProfileImage').attr('src', '/img/userImages/' + image).show()
              } else if (image) {
                $('#UserProfileImage').attr('src', image).show()
              } else {
                $('#UserProfileImage').hide();
              }
            }
          });
</script>
