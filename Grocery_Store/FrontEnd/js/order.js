var orderModal = $("#orderModal");

$(function(){
    $.get(productListApiUrl, function(response){
        if(response){
            products_prices = {};
            var options = '<option value="">--Select--</option>';
            
            $.each(response, function(index, products){
                options += '<option value="'+ products.products_id + '">'+ products.name + '</option>';
                products_prices[products.products_id] = products.price_per_unit;
            });
        }
        $('.product-box').find("select").empty().html(options);
    });
});


function fetchAllDetails() {
    var formData = $("form").serializeArray();
    console.log(formData)
    var products_details = [];
    var products_qty = [];
    var products_comment = [];

    var products_alldetails = {};
    var total = 0;

    $("select[name='product'] option:selected").each(function() {
        var productName = $(this).text().trim();

        if (productName !== "--Select--") {
            products_details.push(productName);
        }
    });

    for (var i = 0; i < formData.length; i++) {
        var element = formData[i];

        switch (element.name) {
            case "product":
                var product = element.value;
                break;
            case "item_total":
                var item_total = element.value;
                products_alldetails[product] = item_total;
                break;
            case "qty":
                var quantity = element.value;
                products_qty.push(quantity);
                break;
            case "comment":
                var comment = element.value;
                products_comment.push(comment);
                break;
        }
    }

    for (var productId in products_alldetails) {
        if (products_alldetails.hasOwnProperty(productId)) {
            total += parseFloat(products_alldetails[productId]);
        }
    }
    var details = products_details.map((value, index) => ({ product: value, quantity: products_qty[index], comment: products_comment[index] }));
    $('#product_grand_total').val(parseFloat(total).toFixed(2));
    return details;
}


$('#addMoreButton').click(function(){
    var row = $(".product-box").html();

    $('.product-box-extra').append(row);

    $('.product-box-extra .remove-row').last().removeClass('hideit');
    $('.product-box-extra .product-price').last().text('0.0');
    $('.product-box-extra .product-qty').last().val("1");
    $('.product-box-extra .product-total').text('0.0');
});


$(document).on("click", '.remove-row', function(){
    $(this).closest('.row').remove();
    fetchAllDetails();
});


$(document).on("change", ".cart-product", function(){
    var product_id = $(this).val();
    var product_price = products_prices[parseInt(product_id)];

    $(this).closest('.row').find('#product_price').val(product_price);

    fetchAllDetails();
});


$(document).on("change", ".row", function(){
    var price = $(this).closest('.row').find('#product_price').val();
    var quantity = $(this).closest('.row').find('.product-qty').val();

    item_total = (price * quantity).toFixed(2);
    $(this).closest('.row').find('#item_total').val(item_total);

    fetchAllDetails();
});


orderModal.on('show.bs.modal', function(){
    var detailsArray = fetchAllDetails();

    var tableBody = $('#orderTable tbody');
    tableBody.empty();

    if (detailsArray) {
        detailsArray.forEach(function (item) {
            var row = '<tr><td>' + item.product + '</td><td>' + item.quantity + '</td>' + '</td><td>' + item.comment + '</td></tr>';
            tableBody.append(row);
        });
    }
});


$('#orderPrint').on("click", function(){
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleDateString('en-US');

    document.getElementById('currentDate').textContent = formattedDate;
    const table = document.getElementById("orderDetails");

    var opt = {
        margin: 1,
        filename: 'Order-'+formattedDate,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(table).set(opt).save();
});