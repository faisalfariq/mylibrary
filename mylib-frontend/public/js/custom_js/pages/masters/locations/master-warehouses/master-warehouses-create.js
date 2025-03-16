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
            if(fieldName == 'warehouse_name'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'warehouse_code'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'email'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'phone'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'address'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'province_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('province id', 'province') + "<br>");
                });
            }
            if(fieldName == 'city_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('city id', 'city') + "<br>");
                });
            }
            if(fieldName == 'sub_district_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('sub district id', 'sub-district') + "<br>");
                });
            }
            if(fieldName == 'sub_division_id'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('sub division id', 'sub-division') + "<br>");
                });
            }
            if(fieldName == 'post_code'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += message;
                });
            }
            if(fieldName == 'is_active'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('is active', 'status') + "<br>");
                });
            }
            if(fieldName == 'is_tcb'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('is tcb', 'tcb') + "<br>");
                });
            }
            if(fieldName == 'is_pos_outlet'){
                validationErrors[fieldName].forEach( function (message){
                    errorMessage += (message.replace('is pos outlet', 'pos outlet') + "<br>");
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

    $('#form-add-master-warehouses').on('submit', function(e){
        e.preventDefault();

        var form_data = new FormData(this);

        $.ajax({
            url : '/master-warehouses',
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
                        window.location.href = '/master-warehouses';
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

    var toggle_is_active = document.getElementById('is_active');
    toggle_is_active.addEventListener('change', function() {
        var description = document.getElementById('is_active_desc');
        if (this.checked) {
            toggle_is_active.value = 1;
            description.textContent = 'Active';
        } else {
            toggle_is_active.value = 0;
            description.textContent = 'Inactive';
        }
    });

    var toggle_is_tcb = document.getElementById('is_tcb');
    toggle_is_tcb.addEventListener('change', function() {
        var description = document.getElementById('is_tcb_desc');
        if (this.checked) {
            toggle_is_tcb.value = 1;
            description.textContent = 'Active';
        } else {
            toggle_is_tcb.value = 0;
            description.textContent = 'Inactive';
        }
    });

    var toggle_is_pos_outlet = document.getElementById('is_pos_outlet');
    toggle_is_pos_outlet.addEventListener('change', function() {
        var description = document.getElementById('is_pos_outlet_desc');
        if (this.checked) {
            toggle_is_pos_outlet.value = 1;
            description.textContent = 'Active';
        } else {
            toggle_is_pos_outlet.value = 0;
            description.textContent = 'Inactive';
        }
    });
});
