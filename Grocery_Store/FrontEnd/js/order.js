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
    console.log(product_id)

    product_price = products_prices[parseInt(product_id)];
    
    $(this).closest('.row').find('#product_price').val(product_price)
    console.log(product_price)
});

