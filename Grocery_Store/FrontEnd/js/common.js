function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/getproducts";
    $.get(url, function(data, status){
        console.log("got response for products");
        console.log(data)
    });
}

window.onload = onPageLoad;