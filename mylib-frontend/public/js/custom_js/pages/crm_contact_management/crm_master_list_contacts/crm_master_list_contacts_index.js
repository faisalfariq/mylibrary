$(document).ready(function () {

    var currentPage = null; // Halaman awal
    loadResults(currentPage);

    function loadResults(page) {
        var keyword = $('#keyword').val();

        $.ajax({
            url: "/master_list_contacts",
            type: "GET",
            data: {
                'page' : page,
                'keyword': keyword
            },
            success: function(response) {
                displayResults(response);
            }
        })
    }

    function initPagination() {
        $('#pagination').off('click', '.page-link');
        $('#pagination').on('click', '.page-link', function (e) {
            e.preventDefault();
            var page = $(this).attr('href').split('page=')[1];
            loadResults(page);
        });
    }

    function displayResults(data) {
        var master_list_contacts = '';

        if (data.data_all_list_contacts.data.length > 0) {
            $.each(data.data_all_list_contacts.data, function (index, contact_list) {
                // if(products.product_image_path == '' || products.product_image_path == null){
                //     var product_image_path = '/img/news/img13.jpg'
                // }else{
                //     var product_image_path = '/storage/'+products.product_image_path;
                // }
                if(contact_list.status == 1){
                    status_label = '<div class="badge badge-primary">active</div>';
                }else{
                    status_label = '<div class="badge badge-danger">deactive</div>';
                }
                master_list_contacts +=     '<tr>' +
                                            '<td>' +
                                                '<div class="custom-checkbox custom-control">' +
                                                    '<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-'+index+'">' +
                                                    '<label for="checkbox-'+index+'" class="custom-control-label">&nbsp;</label>' +
                                                '</div>' +
                                            '</td>' +
                                            '<td>' + contact_list.list_name +
                                                '<div class="table-links">' +
                                                    '<a href="master_list_contacts/'+contact_list.id+'" class="text-primary"><i class="fas fa-eye"></i>View</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="master_list_contacts/'+contact_list.id+'/edit" class="text-warning"><i class="fas fa-edit"></i>Edit</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="#" id="'+contact_list.id+'" class="text-danger btn_delete_product"><i class="fas fa-trash"></i>Trash</a>' +
                                                '</div>' +
                                            '</td>' +
                                            '<td>' + contact_list.apps.app_name + '</td>' +
                                            // '<td>' + contact_list.product_categories.product_category_name + '</td>' +
                                            '<td>' + contact_list.webhook_url + '</td>' +
                                            '<td class="text-center">'+ status_label + '</td>' +
                                            '<td>' + moment(contact_list.created_at).format('DD MMM YYYY HH:mm') + '</td>' +
                                        '</tr>';
            });

            $('#total_data').html(data.data_all_list_contacts.total);
            $('#master_list_contacts').html(master_list_contacts)
            let isi_content = generatePaginationHTML({
                onFirstPage: () => data.data_all_list_contacts.prev_page_url != null ? false : true,
                previousPageUrl: () => data.data_all_list_contacts.prev_page_url ,
                elements: data.data_all_list_contacts.links,
                hasMorePages: () => data.data_all_list_contacts.next_page_url != null ? true : false,
                nextPageUrl: () => data.data_all_list_contacts.next_page_url,
                from:data.data_all_list_contacts.from,
                to: data.data_all_list_contacts.to,
                total: data.data_all_list_contacts.total
            });

            $('#pagination').html(isi_content);

            // Menangani klik pada tautan paginasi
            initPagination()
        }else{
            master_list_contacts += '<tr>'+
                            '<td colspan="6" class="text-center">'+
                                data.message
                            '</td>'+
                        '</tr>';

            $('#total_data').html(data.data_all_list_contacts.total);
            $('#master_list_contacts').html(master_list_contacts)

            // Menampilkan tautan paginasi
            $('#pagination').html('');
        }
        $('.btn_delete_product').on('click', function(e){
            e.preventDefault()
            let contact_list_name = $(this).closest('td').contents().filter(function() {
                return this.nodeType === 3; // Memastikan hanya teks (nodeType 3) yang diambil
            }).text().trim();
            swal({
                title: "Attention",
                text: "Are you sure you want to delete this contact list ? \n Contact list name : "+ contact_list_name,
                icon: "warning",
                buttons: "Ok",
                confirmButtonColor: '#4b68ef',
                dangerMode: true,
            }).then((result) => {
                if (result) {
                    $.ajax({
                        type : "delete",
                        url : "/master_list_contacts/"+ this.id,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        success: function(response) {
                            if(response.status == true){
                                iziToast.success({
                                    title: 'Success',
                                    message: response.message,
                                    position: 'topRight'
                                });
                                setTimeout(function() {
                                    window.location.href = '/master_list_contacts';
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
                        }
                    });
                }
            });
        });
    }

    $('#search_field').on('submit', function(e) {
        e.preventDefault()
        var keyword = $('#keyword').val();
        $.ajax({
            url: "/master_list_contacts",
            type: "GET",
            data: {
                'keyword': keyword
            },
            success: function(response) {
                displayResults(response);
            }
        })
    });

    // Start Custom Fungsi Links() laravel

    // Fungsi untuk membuat tautan paginasi
    function createPaginationLink(url, label, isCurrent, onFirstPage, hasMorePages) {
        if (isCurrent) {
            return '<li class="page-item active" aria-current="page"><span class="page-link">'+label+'</span></li>';
        } else {
            if(label.includes("previous")){
                if(onFirstPage){
                    return '<li class="page-item disabled" aria-disabled="true"><a class="page-link" href="'+url+'">‹</a></li>';
                }else{
                    return '<li class="page-item"><a class="page-link" href="'+url+'">‹</a></li>';
                }
            }else if(label.includes("next")){
                if(!hasMorePages){
                    return '<li class="page-item disabled" aria-disabled="true"><a class="page-link" href="'+url+'">›</a></li>';
                }else{
                    return '<li class="page-item"><a class="page-link" href="'+url+'">›</a></li>';
                }
            }else{
                return '<li class="page-item"><a class="page-link" href="'+url+'">'+label+'</a></li>';
            }
        }
    }

    // Fungsi untuk menghasilkan HTML paginasi
    function generatePaginationHTML(paginator) {
        let paginationHTML_none =   '<div class="d-flex justify-content-between flex-fill d-sm-none">'+
                                        '<ul class="pagination"></ul>';

        let paginationHTML =    '<div class="d-none flex-sm-fill d-sm-flex align-items-sm-center justify-content-sm-between">'+
                                    '<div class="mr-3">'+
                                        '<p class="small text-muted">'+
                                            'Showing'+
                                            '<span class="fw-semibold"> '+paginator.from+' </span>'+
                                            'to'+
                                            '<span class="fw-semibold"> '+paginator.to+' </span>'+
                                            'of'+
                                            '<span class="fw-semibold"> '+paginator.total+' </span>'+
                                            'results'+
                                        '</p>'+
                                    '</div>'+
                                    '<div>'+
                                        '<ul class="pagination">';

        // Tautan halaman sebelumnya
        if (paginator.onFirstPage()) {
            paginationHTML_none += '<li class="page-item disabled" aria-disabled="true"><span class="page-link">‹</span></li>';
        } else {
            paginationHTML_none += '<li class="page-item"><a class="page-link" href="'+paginator.previousPageUrl()+'" rel="prev" aria-label="Previous">‹</a></li>';
        }

        // Tautan halaman-halaman
        paginator.elements.forEach(element => {
            if (typeof element === 'string') {
                // Separator "Three Dots"
                paginationHTML += '<li class="page-item disabled" aria-disabled="true"><span class="page-link">'+element+'</span></li>';
            // } else if (Array.isArray(element)) {
            } else {
                // Array tautan halaman
                paginationHTML += createPaginationLink(element.url, element.label, element.active, paginator.onFirstPage(), paginator.hasMorePages());
            }
        });

        // Tautan halaman berikutnya
        if (paginator.hasMorePages()) {
            paginationHTML_none += '<li class="page-item"><a class="page-link" href="'+paginator.nextPageUrl()+'" rel="next" aria-label="Next">›</a></li>';
        } else {
            paginationHTML_none += '<li class="page-item disabled" aria-disabled="true"><span class="page-link" aria-hidden="true">›</span></li>';
        }

        paginationHTML_none += '</ul></div>';
        paginationHTML += '</ul></div></div>';

        return '<nav class="d-flex justify-items-center justify-content-between"></nav>'+
                paginationHTML_none + paginationHTML+
                '</nav>';
    }

    // End Custom Fungsi Links() laravel

});
