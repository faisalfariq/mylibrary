$(document).ready(function(){

    $('.show_password').on('click', function(e){
        e.preventDefault();
        togglePasswordVisibility(this);
    });

    function togglePasswordVisibility(element) {
        var inputElement = element.closest('.input-group').querySelector('input');
        var iconElement = element.querySelector('i');

        if (inputElement.type === 'password') {
            inputElement.type = 'text';
            iconElement.classList.remove('fa-eye-slash');
            iconElement.classList.add('fa-eye');
        } else {
            inputElement.type = 'password';
            iconElement.classList.remove('fa-eye');
            iconElement.classList.add('fa-eye-slash');
        }
    }


    function validateForm(validationErrors) {
        // Reset error messages
        var errorDivs = document.querySelectorAll('.invalid-feedback');
        errorDivs.forEach(function (errorDiv) {
            errorDiv.innerHTML = '';
        });

        var formInputs = document.querySelectorAll('.form-group input');
            formInputs.forEach(function (input) {
                input.classList.remove('is-invalid');
            });

        // Process validation errors
        Object.keys(validationErrors).forEach(function (fieldName) {
            // var errorMessage = validationErrors[fieldName][0];
            var errorMessage = '';
            if(fieldName == 'password'){
                validationErrors[fieldName].forEach( function (message){
                    if(message == 'validation.confirmed'){
                        errorMessage += "The :attribute confirmation does not match. "+"<br>"
                    }else if(message == 'validation.min.string'){
                        errorMessage += "The :attribute must be at least :8 characters."+"<br>"
                    }
                });
                // var errorElement2 = document.querySelector('.form-group input[name="password_confirmation"]');
                var errorElement2 = document.getElementsByName('password_confirmation')[0];
                errorElement2.classList.add('is-invalid');
            }

            var errorElement = document.getElementsByName(fieldName)[0];
            var errorClass = fieldName + "_error";
            var errorDivs = document.querySelectorAll('.' + errorClass);

            errorElement.classList.add('is-invalid');

            errorDivs.forEach(function (errorDiv) {
                errorDiv.innerHTML = errorMessage;
            });

        });

        // If any validation fails, prevent form submission
        if (Object.keys(validationErrors).length > 0) {
            event.preventDefault();
        }
    }

    $('#form_change_password_user').on('submit', function(e){
        e.preventDefault();

        var user_id = document.getElementsByName('id')[0].value
        var form_data = new FormData(this);

        $.ajax({
            url : '/users/'+user_id+'/change_password',
            method : 'post',
            data : form_data,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                if(response.status == true){
                    iziToast.success({
                        title: 'Success',
                        message: response.message,
                        position: 'topRight'
                    });
                    setTimeout(function() {
                        window.location.href = '/users';
                    }, 3000); //
                }else{
                    iziToast.error({
                        title: 'Something Wrong !',
                        message: response.message,
                        position: 'topRight'
                    });
                }
            },
            error: function(error) {
                iziToast.error({
                    title: 'Something Wrong !',
                    message: error.responseJSON.message,
                    position: 'topRight'
                });
                validateForm(error.responseJSON.errors)
            }
        });
    });
});

