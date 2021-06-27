$(document).ready(function() {
    // Format chuỗi dài quá thì cắt
    $.fn.dataTable.render.ellipsis = function ( cutoff ) {
        return function ( data, type, row ) {
            if ( type === 'display' ) {
                var str = data.toString(); 
     
                return str.length < cutoff ?
                    str :
                    str.substr(0, cutoff-1) +'&#8230;';
            }
     
            return data;
        };
    };

    // Format số
    $.fn.dataTable.render.number = function () {
        return function ( data, type, row ) {
            return data.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g, "."
            );
        };
    };

    // Lưu lại đối tượng datatable
    var table = $('#example').DataTable({
        scrollY: 400,
        scrollX: true,
        colReorder: true,
        autofill:{
            enable: true
        },
        scroller: {
            rowHeight: 50
        },
        select: true,
        fixedColumns: false,
        rowReorder:true,
        autoWidth: true,
        processing: true,
        pageLength: 20,
        data: data,
        deferRender: true,
        stateSave: false, // Có lưu lại trạng thái ko
        drawCallback: function( settings ) {
            console.log("Table đã vẽ xong");
        },
        createdRow: function( row, data, dataIndex ) {
            if (data[4] == "A" ) {
              $(row).addClass( 'important' );
            }
        },
        headerCallback: function( thead, data, start, end, display ) {
           // $(thead).find('th').eq(0).html( 'Displaying '+(end-start)+' records' );
        },
        formatNumber: function ( toFormat ) {
            return toFormat.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g, "'"
            );
        },
        columns: [
            { 
                data: 'name', 
                name: "engine",
                title: 'Tiêu đề 1',
                width: "100px" ,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).css('color', 'red')
                }
            },
            {   
                data: 'position', 
                title: 'Tiêu đề 2',
                visible: true,
                width: "12%", 
                render: $.fn.dataTable.render.ellipsis(10)
            },
            { 
                data: 'salary', 
                title: 'Tiêu đề 3',
                searchable: false ,
                render:  $.fn.dataTable.render.number()
            },
            { 
                title: 'Tiêu đề 4',
                data: 'start_date' ,
                render: function ( data, type, row, meta ) {
                    return `<a href="#">${data}</a>`;
                }
            },
            { 
                data: 'office',  
                title: 'Tiêu đề 5', 
            },
            { 
                data: 'extn', 
                title: 'Tiêu đề 6', 
            },
            { 
                data: null,
                searchable: false ,
                sortable: false,
                defaultContent: "<button>Edit</button> <button>Delete</button>"
            }
        ],
        order: [[1, 'asc']], // Mới vào sẽ sort cột 2
        language: {
            decimal: "-",
            thousands: ".",
            info: "Kết quả từ  _START_  - _END_ trên tổng  _TOTAL_ ( max = _MAX_)   trang _PAGE_ /  _PAGES_",
            infoEmpty: "Không có kết quả trả ra",
            processing: "Vui lòng đợi...",
            zeroRecords: "<b>Không có kết quả trả về khi tìm kiếm</b>",
            emptyTable: "Bảng không có dữ liệu",
            select: {
                rows: {
                    _: "Selected %d rows",
                    1: "Selected 1 row"
                }
            }
        },
        columnDefs: [
            { targets: [0], visible: true},
            {className: "td-text-center", targets: "_all"}
            // { "width": "100px", "targets": 0 },
            // { "width": "10%", "targets": 1 },
            // {
            //     "targets": -1,
            //     "defaultContent": "<button>Edit</button> <button>Delete</button>"
            // },
            // {
            //     "targets": 1,
            //     "render": function ( data, type, row, meta ) {
            //       return `<a href="#">${data}</a>`;
            //     }
            // }
        ]
    });
} );