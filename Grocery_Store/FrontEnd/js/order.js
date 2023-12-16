$('#addMoreButton').click(function(){
    var row = $(".product-box").html();

    $('.product-box-extra').append(row);

    $('.product-box-extra .remove-row').last().removeClass('hideit');
    $('.product-box-extra .product-price').last().text('0.0');
    $('.product-box-extra .product-qty').last().val("1")
    $('.product-box-extra .product-total').text('0.0');

});


$(document).on("click", '.remove-row', function(){
    $(this).closest('.row').remove();
});


$(function(){
    $.get(productListApiUrl, function(response){
        if(response){
            products_prices = {}
            var options = '<option value="">--Select--</options>'
            $.each(response, function(index, products){
                options += '<option value=" '+products.products_id + '">'+ products.name + '</options>';
                products_prices[products.products_id]= products.price_per_unit
            });

        }
        $('.product-box').find("select").empty().html(options);

    });
});


$(document).on("change", ".cart-product", function(){
    product_id = $(this).val()
    product_price = products_prices[parseInt(product_id)];
    
    $(this).closest('.row').find('#product_price').val(product_price)
});


$(document).on("click", "#detailsPrint", function(){
    var formData = $("form").serializeArray();

    var products_details = []
    var products_qty = []

    $("select[name='product'] option:selected").each(function() {
        var productName = $(this).text().trim();

        if (productName !== "--Select--") {
            products_details.push(productName);
        }
    });

    for(var i=0; i<formData.length;i++){
        var element = formData[i];

        switch(element.name){

            case "qty":
                var quantity = element.value;
                products_qty.push(quantity);
                break;
        }
    }

    var details = products_details.map((value, index) => ({ product: value, quantity: products_qty[index] }));
    console.log(details);
    console.log(details[1]);
});

