var productListApiUrl = "http://127.0.0.1:5000/getproducts";
var productDeleteApiUrl = "http://127.0.0.1:5000/deleteproducts";

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function( msg ) {
        window.location.reload();
    });
}

