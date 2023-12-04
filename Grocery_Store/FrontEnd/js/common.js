var productListApiUrl = "http://127.0.0.1:5000/getproducts";
var productInsertApiUrl = "http://127.0.0.1:5000/insertproducts";
var productUpdateApiUrl = "http://127.0.0.1:5000/updateproducts";
var productDeleteApiUrl = "http://127.0.0.1:5000/deleteproducts";
var uomListApiUrl = "http://127.0.0.1:5000/getuoms";


function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function( msg ) {
        window.location.reload();
    });
}


function callinsertApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    });
}

