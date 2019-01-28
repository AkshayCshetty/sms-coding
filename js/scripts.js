var request = new XMLHttpRequest();
request.open("GET", "../../data.json", false);
request.send(null)
var result = JSON.parse(request.responseText);


$(document).ready(function(){
    $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var min = $('#min').datepicker("getDate");
        var max = $('#max').datepicker("getDate");
        var startDate = new Date(data[1]);
        if (min == null && max == null) { return true; }
        if (min == null && startDate <= max) { return true;}
        if(max == null && startDate >= min) {return true;}
        if (startDate <= max && startDate >= min) { return true; }
        return false;
    });

   
    $("#min").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
    $("#max").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
    var table = $('#table').DataTable({
        "ajax" : "data.json",
        data: result,
        columns: [
            { "data" : "city" },
            { "data" : "start_date" },
            { "data" : "end_date" },
            { "data" : "price" },
            { "data" : "status" },
            { "data" : "color" }
        ]
    });

    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').change(function () {
        table.draw();
    });
});