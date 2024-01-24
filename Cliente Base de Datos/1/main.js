$(document).ready(function () {
    $("#verProv").click(function () {
        $.ajax({
            url: 'index.php',
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                $("#res").html(data);
            },
            error: function (error) {
                console.log('Error: ', error);
            }
        });
    });
});