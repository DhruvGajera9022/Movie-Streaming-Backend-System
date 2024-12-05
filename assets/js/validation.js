$(document).ready(function () {
    let loginForm = $("#loginForm");
    let registerPage = $("#registerPage");
    let forgotPassForm = $("#forgotPassForm");
    let recoverPassForm = $("#recoverPassForm");
    let formAddUser = $("#formAddUser");
    let formAddRole = $("#formAddRole");
    let formProfile = $("#formProfile");
    let formPassword = $("#formPassword");
    let formAddCategory = $("#formAddCategory");
    let formAddProduct = $("#formAddProduct");
    let formAddress = $("#formAddress");
    let addSettings = $("#addSettings");
    let formAddDiscount = $("#formAddDiscount");
    let formAddMovie = $("#formAddMovie");
    let formAddTopImage = $("#formAddTopImage");

    loginForm.validate({
        rules: {
            email: {
                required: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Email is required",
            },
            password: {
                required: "Password is required",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    registerPage.validate({
        rules: {
            fullname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
        },
        messages: {
            fullname: {
                required: "Name is required",
                minlength: "Name must be at least 3 characters long"
            },
            email: {
                required: "Email is required",
            },
            password: {
                required: "Password is required",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is required",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    forgotPassForm.validate({
        rules: {
            email: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Email is required",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    recoverPassForm.validate({
        rules: {
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
        },
        messages: {
            password: {
                required: "Password is required",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is required",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest(".input-group").next(".error-message"));
        }
    });

    formAddUser.validate({
        rules: {
            fullName: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            role: {
                required: true,
            },
        },
        messages: {

            fullName: {
                required: "Full Name is required",
                minlength: "Full Name must be at least 3 characters long",
            },
            email: {
                required: "Email is required",
            },
            password: {
                required: "Password is required",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is required",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            role: {
                required: "Role is required",
            },
        }
    });

    formAddRole.validate({
        rules: {
            title: {
                required: true,
                minlength: 3
            },
            description: {
                required: false,
                minlength: 10
            }
        },
        messages: {
            title: {
                required: "Please enter a role title",
                minlength: "Title must be at least 3 characters long"
            },
            description: {
                minlength: "Description must be at least 10 characters long"
            }
        },
    });

    formProfile.validate({
        rules: {
            fullname: {
                required: true,
                minlength: 3,
            },
            email: {
                required: true,
            },
            number: {
                required: true,
            }
        },
        messages: {
            fullname: {
                required: "Full Name is required",
                minlength: "Name must be at least 3 characters long"
            },
            email: {
                required: "Email is required",
            },
            number: {
                required: "Number is required",
            }
        }
    });

    formPassword.validate({
        rules: {
            password: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
            cpassword: {
                required: true,
                minlength: 6,
                maxlength: 16,
            },
        },
        messages: {
            password: {
                required: "Password is required",
                minlength: "Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
            cpassword: {
                required: "Confirm-Password is required",
                minlength: "Confirm-Password must be at least 6 character long",
                maxlength: "Maximum length is 16",
            },
        },
    });

    formAddCategory.validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
        },
        messages: {
            name: {
                required: 'Category Name is required',
                minlength: 'Category Name must be at least 3 characters long',
            },
        }
    });

    formAddProduct.validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            price: {
                required: true,
            },
            category: {
                required: true,
            },
        },
        messages: {
            name: {
                required: "Product Name is required",
                minlength: "Product Name must be at least 3 characters long",
            },
            price: {
                required: "Price is required",
            },
            category: {
                required: "Category is required",
            },
        },
    });

    formAddress.validate({
        rules: {
            fullName: {
                required: true,
                minlength: 3,
            },
            number: {
                required: true
            },
            fullName: {
                required: true
            },
            no: {
                required: true
            },
            street: {
                required: true
            },
            city: {
                required: true
            },
            state: {
                required: true
            },
            country: {
                required: true
            },
            zipCode: {
                maxlength: 6,
                minlength: 6,
            },
            type: {
                required: true
            },
        },
        messages: {
            fullName: {
                required: "Name is required",
                minlength: "Name must be at least 3 characters long",
            },
            number: {
                required: "Number is required"
            },
            no: {
                required: "Flat, House no, Building, Company, Apartment is required"
            },
            street: {
                required: "Area, Street, Sector, Village is required"
            },
            city: {
                required: "Town/City is required"
            },
            state: {
                required: "State is required"
            },
            country: {
                required: "Country is required"
            },
            zipCode: {
                minlength: "Minimum 6 digits required",
                maxlength: "Maximum 6 digits required",
            },
            type: {
                required: "Type is required"
            },

        }
    });

    addSettings.validate({
        rules: {
            email: {
                required: true,
            },
            phone: {
                required: true,
            },
        },
        messages: {
            email: {
                required: "Email is required",
            },
            phone: {
                required: "Phone number is required",
            },
        }
    });

    formAddDiscount.validate({
        rules: {
            name: {
                required: true,
            },
            type: {
                required: true,
            },
            value: {
                required: true,
            },
            expire: {
                required: true,
            },
        },
        messages: {
            name: {
                required: "Discount name is required",
            },
            type: {
                required: "Type is required",
            },
            value: {
                required: "Value is required",
            },
            expire: {
                required: "Expiry date is require",
            },
        }
    });

    formAddMovie.validate({
        rules: {
            title: {
                required: true,
            },
            overview: {
                required: true,
            },
            category: {
                required: true,
            },
            original_language: {
                required: true
            },
        },
        messages: {
            title: {
                required: "Title is required",
            },
            overview: {
                required: "Overview is required",
            },
            category: {
                required: "Category is required",
            },
            original_language: {
                required: "Original Language is required"
            },
        }
    });

    formAddTopImage.validate({
        rules: {
            title: {
                required: true,
            },
            description: {
                required: true,
            },
            category: {
                required: true,
            },
            language: {
                required: true
            },
        },
        messages: {
            title: {
                required: "Title is required",
            },
            description: {
                required: "Description is required",
            },
            category: {
                required: "Category is required",
            },
            language: {
                required: "Language is required"
            },
        }
    });

});
