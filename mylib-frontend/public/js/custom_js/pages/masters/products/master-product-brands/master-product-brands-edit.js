$(document).ready(function(){

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
            if(fieldName == 'product_brand_name'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'product_brand_slug'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
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

    $('#form-edit-master-product-brands').on('submit', function(e){
        e.preventDefault();

        var product_brand_id = $("#product_brand_id").val();

        var form_data = new FormData(this);

        $.ajax({
            url : '/master-product-brands/'+ product_brand_id,
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
                        window.location.href = '/master-product-brands/' + product_brand_id;
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
