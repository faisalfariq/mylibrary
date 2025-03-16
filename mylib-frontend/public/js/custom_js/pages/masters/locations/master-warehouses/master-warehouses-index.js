$(document).ready(function () {

    var currentPage = null; // First page
    loadResults(currentPage);

    function loadResults(page) {
        var keyword = $('#keyword').val();

        $.ajax({
            url: "/master-warehouses",
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

    function displayResults(response) {
        var warehouses_list = '';

        if (response.data.data.length > 0) {
            $.each(response.data.data, function (index, warehouses) {
                let status_label = '<div class="badge badge-danger">inactive</div>';
                let tcb_label = '<div class="badge badge-danger">inactive</div>';
                let pos_label = '<div class="badge badge-danger">inactive</div>';
                if(warehouses.is_active == 1){
                    status_label = '<div class="badge badge-primary">active</div>';
                }
                if(warehouses.is_tcb == 1){
                    tcb_label = '<div class="badge badge-primary">active</div>';
                }
                if(warehouses.is_pos_outlet == 1){
                    pos_label = '<div class="badge badge-primary">active</div>';
                }
                warehouses_list +=     '<tr>' +
                                            '<td>' +
                                                '<div class="custom-checkbox custom-control">' +
                                                    '<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-'+index+'">' +
                                                    '<label for="checkbox-'+index+'" class="custom-control-label">&nbsp;</label>' +
                                                '</div>' +
                                            '</td>' +
                                            '<td>' + warehouses.warehouse_name +
                                                '<div class="table-links">' +
                                                    '<a href="master-warehouses/'+warehouses.id+'" class="text-primary"><i class="fas fa-eye"></i>View</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="master-warehouses/'+warehouses.id+'/edit" class="text-warning"><i class="fas fa-edit"></i>Edit</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="#" id="'+warehouses.id+'" class="text-danger btn-delete-warehouses"><i class="fas fa-trash"></i>Trash</a>' +
                                                '</div>' +
                                            '</td>' +
                                            '<td>' + (warehouses.warehouse_code ?? '-') + '</td>' +
                                            '<td>' + (warehouses.email ?? '-') + '</td>' +
                                            '<td>' + (warehouses.phone ?? '-') + '</td>' +
                                            '<td>' + (warehouses.cities.city_name ?? '-') + '</td>' +
                                            '<td class="text-center">' + (status_label ?? '-') + '</td>' +
                                            '<td class="text-center">' + (tcb_label ?? '-') + '</td>' +
                                            '<td class="text-center">' + (pos_label ?? '-') + '</td>' +
                                            '<td>' + moment(warehouses.created_at).format('DD MMM YYYY HH:mm') + '</td>' +
                                        '</tr>';
            });

            $('#total_data').html(response.data.total);
            $('#warehouses-list-field').html(warehouses_list)
            let pagination_list = generatePaginationHTML({
                onFirstPage: () => response.data.prev_page_url != null ? false : true,
                previousPageUrl: () => response.data.prev_page_url ,
                elements: response.data.links,
                hasMorePages: () => response.data.next_page_url != null ? true : false,
                nextPageUrl: () => response.data.next_page_url,
                from:response.data.from,
                to: response.data.to,
                total: response.data.total
            });

            $('#pagination').html(pagination_list);

            // pagination handling
            initPagination()
        }else{
            warehouses_list += '<tr>'+
                            '<td colspan="5" class="text-center">'+
                                response.message
                            '</td>'+
                        '</tr>';

            $('#total_data').html(response.data.total);
            $('#warehouses-list-field').html(warehouses_list)

            // show pagination list
            $('#pagination').html(''); 
        }

        $('.btn-delete-warehouses').on('click', function(e){
            e.preventDefault()
            let warehouse_name = $(this).closest('td').contents().filter(function() { 
                return this.nodeType === 3; // Ensures only text (nodeType 3) is retrieved
            }).text().trim();
            swal({
                title: "Attention",
                text: "Are you sure you want to delete this warehouses ? \n Warehouses name : "+ warehouse_name,
                icon: "warning",
                buttons: "Ok",
                confirmButtonColor: '#4b68ef',
                dangerMode: true,
            }).then((result) => {
                if (result) {
                    $.ajax({
                        type : "delete",
                        url : "/master-warehouses/"+ this.id,
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

    $('#search-field').on('submit', function(e) {
        e.preventDefault()
        var keyword = $('#keyword').val();
        $.ajax({
            url: "/master-warehouses",
            type: "GET",
            data: {
                'keyword': keyword
            },
            success: function(response) {
                displayResults(response);
            }
        })
    });

    // Start Customize Links() Laravel Function

    // Generate Pagination Links Function
    function createPaginationLink(url, label, isCurrent, onFirstPage, hasMorePages) {
        if (isCurrent) {
            return '<li class="page-item active" aria-current="page"><span class="page-link">'+label+'</span></li>';
        } else {
            if(label.toLowerCase().includes("previous")){
                if(onFirstPage){
                    return '<li class="page-item disabled" aria-disabled="true"><a class="page-link" href="'+url+'">‹</a></li>';
                }else{
                    return '<li class="page-item"><a class="page-link" href="'+url+'">‹</a></li>';
                }
            }else if(label.toLowerCase().includes("next")){
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

    // Generate Pagination HTML Function
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

        // Previous Page Link
        if (paginator.onFirstPage()) {
            paginationHTML_none += '<li class="page-item disabled" aria-disabled="true"><span class="page-link">‹</span></li>';
        } else {
            paginationHTML_none += '<li class="page-item"><a class="page-link" href="'+paginator.previousPageUrl()+'" rel="prev" aria-label="Previous">‹</a></li>';
        }

        // Other Page Links
        paginator.elements.forEach(element => {
            if (typeof element === 'string') {
                // Separator "Three Dots"
                paginationHTML += '<li class="page-item disabled" aria-disabled="true"><span class="page-link">'+element+'</span></li>';
            // } else if (Array.isArray(element)) {
            } else {
                // Array Page Link
                paginationHTML += createPaginationLink(element.url, element.label, element.active, paginator.onFirstPage(), paginator.hasMorePages());
            }
        });

        // Next Page Link
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

    // End Customize Links() Laravel Function

});
