$(document).ready(function(){

    $('.select2').select2({
        placeholder: "Select an option",
        allowClear: true
    })
    
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
            if(fieldName == 'city_name'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'province_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('province id', 'province') + "<br>");
                });
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

    $('#form-add-master-cities').on('submit', function(e){
        e.preventDefault();

        var form_data = new FormData(this);

        $.ajax({
            url : '/master-cities',
            type : 'post',
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
                        window.location.href = '/master-cities';
                    }, 1000); //
                }else{
                    iziToast.error({
                        title: 'Something Wrong !',
                        message: response.message,
                        position: 'topRight'
                    });
                }
            },
            error: function(error) {
                if(error.responseJSON.message.includes("Duplicate entry")){
                    errormessage = "Oops! The slug you're trying to use is already taken. Please choose a unique one to avoid duplication.";
                }else{
                    errormessage = error.responseJSON.message
                }
                iziToast.error({
                    title: 'Something Wrong !', 
                    message: errormessage,
                    position: 'topRight'
                });
                validateForm(error.responseJSON.errors)
            }
        });
    });
});
