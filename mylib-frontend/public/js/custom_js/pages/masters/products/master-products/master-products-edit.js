$(document).ready(function(){

    $('.select2').select2({
        placeholder: "Select an option",
        allowClear: true
    });
    
    $.uploadPreview({
        input_field: "#image-upload",   // Default: .image-upload
        preview_box: "#image-preview",  // Default: .image-preview
        label_field: "#image-label",    // Default: .image-label
        label_default: "Choose File",   // Default: Choose File
        label_selected: "Change File",  // Default: Change File
        no_label: false,                // Default: false
        success_callback: null          // Default: null
    });

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
            if(fieldName == 'product_sku'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message + "<br>");
                });
            }
            if(fieldName == 'product_name'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message + "<br>");
                });
            }
            if(fieldName == 'product_category_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('product category id', 'product category') + "<br>");
                });
            }
            if(fieldName == 'product_brand_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('product brand id', 'product brand')+ "<br>");
                });
            }
            if(fieldName.includes('product_tag_id')){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('.product_tag_id.', 'product tag')+ "<br>");
                });
                fieldName = 'product_tag_id[]';
            }
            if(fieldName == 'product_image'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message + "<br>");
                });
            }

            var errorElement = document.getElementsByName(fieldName)[0];
            var errorClass = fieldName.replace(/\[\]/g, '') + "_error";
            var errorDivs = document.querySelectorAll('.' + errorClass);

            errorElement.classList.add('is-invalid');

            errorDivs.forEach(function (errorDiv) {
                errorDiv.insertAdjacentHTML('beforeend',errorMessage);
            });

        });

        // If any validation fails, prevent form submission
        if (Object.keys(validationErrors).length > 0) {
            event.preventDefault();
        }
    }

    $('#form-edit-master-products').on('submit', function(e){
        e.preventDefault();

        var product_id = $("#product_id").val();

        var form_data = new FormData(this);

        $.ajax({
            url : '/master-products/'+ product_id,
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
                        window.location.href = '/master-products/' + product_id;
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
                    errormessage = response.message
                }
                iziToast.error({
                    title: 'Something Wrong !', 
                    message: errormessage,
                    position: 'topRight'
                });
                // validateForm(error.responseJSON.errors)
            }
        });
    });
});
