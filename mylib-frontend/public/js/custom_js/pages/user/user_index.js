$(document).ready(function () {
        // initPagination()
        var currentPage = null; // Halaman awal
        loadResults(currentPage);

        function loadResults(page) {
            var keyword = $('#keyword').val();

            $.ajax({
                // url: "/user/search",
                url: "/users",
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
        // function displayResults(data){ //fungsi untuk mereturn view search
        //     $('#userTableList').html(data)
        //     initPagination()
        // }

        function displayResults(data) {
            var userList = '';

            if (data.data_all_users.data.length > 0) {
                $.each(data.data_all_users.data, function (index, user) {
                    var account_status = user.account_status == 1 ? 'Active' : 'Non Active';
                    var status_badge = user.account_status == 1 ? 'primary' : 'danger';
                    userList +=     '<tr>' +
                                            '<td>' +
                                                '<div class="custom-checkbox custom-control">' +
                                                    '<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-'+index+'">' +
                                                    '<label for="checkbox-'+index+'" class="custom-control-label">&nbsp;</label>' +
                                                '</div>' +
                                            '</td>' +
                                            '<td>' + user.name +
                                                '<div class="table-links">' +
                                                    '<a href="/users/'+user.id+'" class="text-primary"><i class="fas fa-eye"></i>View</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="/users/'+user.id+'/edit" class="text-info"><i class="fas fa-edit"></i>Edit</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="/users/'+user.id+'/change_password" class="text-warning"><i class="fas fa-edit"></i>Change Password</a>' +
                                                '<div class="bullet"></div>' +
                                                    '<a href="#" id="'+user.id+'" class="text-danger btn_delete_user"><i class="fas fa-trash"></i>Trash</a>' +
                                                '</div>' +
                                            '</td>' +
                                            '<td>' +
                                                '<a href="#">' + user.email + '</a>' +
                                            '</td>' +
                                            '<td>' +
                                                user.roles+
                                            '</td>' +
                                            '<td>'+
                                                '<div class="badge badge-'+status_badge+'">'+account_status+'</div>' +
                                            '</td>' +
                                            '<td>' + moment(user.created_at).format('DD MMM YYYY HH:mm') + '</td>' +
                                        '</tr>';
                });

                $('#total_data').html(data.data_all_users.total);
                $('#userList').html(userList)
                let isi_content = generatePaginationHTML({
                    onFirstPage: () => data.data_all_users.prev_page_url != null ? false : true,
                    previousPageUrl: () => data.data_all_users.prev_page_url ,
                    elements: data.data_all_users.links,
                    hasMorePages: () => data.data_all_users.next_page_url != null ? true : false,
                    nextPageUrl: () => data.data_all_users.next_page_url,
                    from:data.data_all_users.from,
                    to: data.data_all_users.to,
                    total: data.data_all_users.total
                });

                $('#pagination').html(isi_content);

                // Menangani klik pada tautan paginasi
                initPagination()
            }else{
                userList += '<tr>'+
                                '<td colspan="6" class="text-center">'+
                                    data.message
                                '</td>'+
                            '</tr>';

                $('#total_data').html(data.data_all_users.total);
                $('#userList').html(userList)


                // Menampilkan tautan paginasi
                $('#pagination').html('');

            }
            $('.btn_delete_user').on('click', function(e){
                e.preventDefault()
                let user_name = $(this).closest('td').contents().filter(function() {
                    return this.nodeType === 3; // Memastikan hanya teks (nodeType 3) yang diambil
                }).text().trim();
                console.log(user_name)
                swal({
                    title: "Attention",
                    text: "Are you sure you want to delete this user ? User name : "+ user_name,
                    icon: "warning",
                    buttons: "Ok",
                    confirmButtonColor: '#4b68ef',
                    dangerMode: true,
                }).then((result) => {
                    if (result) {
                        $.ajax({
                            type : "delete",
                            url : "/users/"+ this.id,
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
                                        window.location.href = '/users';
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
                url: "/users",
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
                    // element.forEach((page, index) => {
                        paginationHTML += createPaginationLink(element.url, element.label, element.active, paginator.onFirstPage(), paginator.hasMorePages());
                    // });
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
