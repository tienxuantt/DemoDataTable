// Lưu lại đối tượng datatable
var table = $('#example').DataTable();
 
// Nếu click vào all thì hiển thị phân trang với pageLength = all
$('#all').on( 'click', function () {
    table.page.len(-1).draw();
} );

// Nếu click vào all thì hiển thị phân trang với pageLength = 10
$('#_15').on( 'click', function () {
    table.page.len( 15 ).draw();
} );

// Chức năng tương tự như bấm next
$('#next').on( 'click', function () {
    table.page( 'next' ).draw( 'page' );
} );
 
// Chức năng tương tự như bấm prev
$('#previous').on( 'click', function () {
    table.page( 'previous' ).draw( 'page' );
} );

// Mặc định cho các datatable sau này
$.extend( $.fn.dataTable.defaults, {
    searching: false,
    ordering:  false
} );

// Xem thông tin page
$('#view_page_infor').on( 'click', function () {
    console.log(table.page.info());
} );

var table1 = $('#example1').DataTable();
var table2 = $('#example2').DataTable();
 
// Chuyển một dòng từ row này sang bảng khác
$('#example tbody').on( 'click', 'img.icon-transfer', function () {
    var row = table1.row( $(this).parents('tr') );
    var rowNode = row.node();
    row.remove();
 
    table2
        .row.add( rowNode )
        .draw();
} );

// Xóa 1 dòng
$('#example tbody').on( 'click', 'img.icon-delete', function () {
    table
        .row( $(this).parents('tr') )
        .remove()
        .draw();
} );

// Xóa nhiều dòng
var rows = table
    .rows( '.selected' )
    .remove()
    .draw();

// Xóa hết dòng
var rows = table
    .rows()
    .remove()
    .draw();

// Xóa hết bảng
table
    .clear()
    .draw();

// Thêm nhiều dòng
table.rows.add( [ {
    "name":       "Tiger Nixon",
    "position":   "System Architect",
    "salary":     "$3,120",
    "start_date": "2011/04/25",
    "office":     "Edinburgh",
    "extn":       "5421"
}, {
    "name": "Garrett Winters",
    "position": "Director",
    "salary": "$5,300",
    "start_date": "2011/07/25",
    "office": "Edinburgh",
    "extn": "8422"
} ] )
.draw();

// Thêm 1 dòng
table.row.add({ 
    "name":       "Tiger Nixon 1122",
    "position":   "System Architect",
    "salary":     "$3,120",
    "start_date": "2011/04/25",
    "office":     "Edinburgh",
    "extn":       "5421"
});

// Thêm dòng mới vào addClass vào các dòng đó
table
    .rows.add( [
        new Pupil( 43 ),
        new Pupil( 67 ),
        new Pupil( 102 )
    ] )
    .draw()
    .nodes()
    .to$()
    .addClass( 'new' );

// Thêm dòng vào add css cho dòng đó
var rowNode = table
    .row.add( [ 'Fiona White', 32, 'Edinburgh' ] )
    .draw()
    .node();
 
$( rowNode )
    .css( 'color', 'red' )
    .animate( { color: 'black' } );

// Sắp xếp
var order = table.order();

table
    .order( [ 1, 'asc' ] )
    .draw();

table
    .order( [[ 1, 'asc' ], [ 2, 'asc' ]] )
    .draw();

table
    .column( '0:visible' )
    .order( 'asc' )
    .draw();

table
    .columns( '.status' )
    .order( 'desc' )
    .draw();

// Tìm kiếm
$('#myInput').on( 'keyup', function () {
    table.search( this.value ).draw();
} );

$('#column3_search').on( 'keyup', function () {
    table
        .columns( 3 )
        .search( this.value )
        .draw();
} );

table
    .columns( '.highlight' )
    .header()
    .to$()
    .removeClass( 'highlight' );

$('#example tbody').on( 'click', 'td', function () {
    var idx = table.cell( this ).index().column;
    var title = table.columns( idx ).header();
    
    alert( 'Column title clicked on: '+$(title).html() );
} );

$('#example tbody').on( 'click', 'td', function () {
    var idx = table.cell( this ).index().column;
    var title = table.column( idx ).header();
 
    alert( 'Column title clicked on: '+$(title).html() );
} );

// ẩn hiện cột
table.columns( [1,2] ).visible( false );
table.columns( '.detail' ).visible( false );
table.column( 0 ).visible( false );
table.columns.adjust().draw( false );

table.column( 0 ).visible( false );
var idx = table.column( 1 ).index( 'visible' );