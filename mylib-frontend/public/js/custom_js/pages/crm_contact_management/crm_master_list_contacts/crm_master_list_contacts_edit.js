$(document).ready(function(){

    // $('.select2').select2({
    //     placeholder: "Select an option",
    // });

    $(".inputtags").tagsinput({
        trimValue: true, // Trim the value of each tag
        allowDuplicates: false // Prevent duplicate tags
    });

    function applyValidation(input) {
        // Validate input to allow only numbers
        input.on('keypress', function(e) {
            var pattern = /^[0-9]+$/;
            var char = String.fromCharCode(e.which);

            if (!pattern.test(char)) {
                e.preventDefault();
            }
        });
    }

    // Apply validation to the initial input
    var initialInput = $('.inputtags').siblings('.bootstrap-tagsinput').find('input');
    applyValidation(initialInput);


    $('.select2').select2({
        placeholder: "Select an option",
        allowClear: true
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
            if(fieldName == 'list_name'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }else if(fieldName == 'id_app'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message.replace("id app", "app name");
                });
            }else if(fieldName == 'id_cust_category'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message.replace("id cust category", "customer category");
                });
            }else if(fieldName == 'webhook_url'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            console.log(errorMessage);

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

    $('#form_edit_contact_list').on('submit', function(e){
        e.preventDefault();

        var contact_list_id = document.getElementsByName('id')[0].value

        var form_data = new FormData(this);

        $.ajax({
            url : '/master_list_contacts/'+contact_list_id,
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
                        window.location.href = '/master_list_contacts/' + contact_list_id;
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
                iziToast.error({
                    title: 'Something Wrong !',
                    message: error.responseJSON.message,
                    position: 'topRight'
                });
                validateForm(error.responseJSON.errors)
            }
        });
    });

    var toggle_status = document.getElementById('status');
    toggle_status.addEventListener('change', function() {
        var description = document.getElementById('status_desc');
        if (this.checked) {
            toggle_status.value = 1;
            description.textContent = 'On';
        } else {
            toggle_status.value = 0;
            description.textContent = 'Off';
        }
    });
});
