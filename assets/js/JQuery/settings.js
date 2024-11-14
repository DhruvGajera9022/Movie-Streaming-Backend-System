<script>
    $(document).ready(function () {
        fetchSettings();
    });

    function fetchSettings() {
        $.ajax({
            url: '/getSettings',
            type: 'GET',
            dataType: 'json',
            success: function (settings) {
                $('#settings-grid').empty();

                settings.forEach(function (setting) {
                    var settingHtml = `
                    <div class="col-md-4">
                        <div class="card mb-3 shadow-sm">
                            <div class="d-flex justify-content-between">
                                <div></div>
                                <a href="/settings/${setting.id}" class="text-success">
                                    <i class="fas fa-edit fa-lg mx-1 mt-2"></i>
                                </a>
                            </div>
                            <div class="card-body">
                                <p class="card-text">
                                    <strong>Contact:</strong><br />
                                    ${setting.email ? `<strong>Email: </strong> ${setting.email}<br/>` : ''}
                                    ${setting.phone ? `<strong>Phone: </strong> ${setting.phone}<br/>` : ''}
                                </p>
                                <p class="card-text">
                                    <strong>Social Media:</strong><br />
                                    ${setting.facebook ? `Facebook: ${setting.facebook}<br/>` : ''}
                                    ${setting.twitter ? `Twitter: ${setting.twitter}<br/>` : ''}
                                    ${setting.linkedIn ? `LinkedIn: ${setting.linkedIn}<br/>` : ''}
                                    ${setting.instagram ? `Instagram: ${setting.instagram}<br/>` : ''}
                                </p>
                                <p class="card-text">
                                    <strong>App store:</strong><br />
                                    ${setting.app_store ? `App Store: ${setting.app_store}<br/>` : ''}
                                    ${setting.play_store ? `Play Store: ${setting.play_store}<br/>` : ''}
                                </p>
                                <p class="card-text">
                                    ${setting.logo ? `<strong>Logo:</strong><br/><img src="img/settingImages/${setting.logo}" class="img-fluid" height="50px" width="50px" />` : ''}
                                </p>
                                <p class="card-text">
                                    ${setting.privacy_policy ? `<strong>Privacy Policy:</strong> ${setting.privacy_policy}` : ''}
                                </p>
                                <p class="card-text">
                                    ${setting.term_condition ? `<strong>Terms & Conditions:</strong> ${setting.term_condition}` : ''}
                                </p>
                            </div>
                        </div>
                    </div>`;

                    $('#settings-grid').append(settingHtml);
                });
            },
            error: function (error) {
                console.error("Error fetching settings", error);
            }
        });
    }


    
</script>
