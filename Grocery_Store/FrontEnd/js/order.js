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

