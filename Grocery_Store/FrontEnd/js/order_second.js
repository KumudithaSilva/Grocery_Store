var ProductManager = {
    products_prices: {},

    init: function () {
        this.setupEventHandlers();
        this.loadProductList();
    },

    setupEventHandlers: function () {
        $(document).on("click", '#addMoreButton', this.addProductRow.bind(this));
        $(document).on("click", '.remove-row', this.removeProductRow);
        $(document).on("change", '.cart-product', this.handleProductChange);
        $(document).on("click", '#detailsPrint', this.printDetails.bind(this));
    },

    loadProductList: function () {
        $.get(productListApiUrl, function (response) {
            if (response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function (index, product) {
                    options += '<option value="' + product.products_id + '">' + product.name + '</option>';
                    ProductManager.products_prices[product.products_id] = product.price_per_unit;
                });
                $('.product-box').find('select').empty().html(options);
            }
        });
    },

    addProductRow: function () {
        var row = $('.product-box').html();
        $('.product-box-extra').append(row);

        var lastRow = $('.product-box-extra .row').last();
        lastRow.find('.remove-row').removeClass('hideit');
        lastRow.find('.product-price').text('0.0');
        lastRow.find('.product-qty').val("1");
        lastRow.find('.product-total').text('0.0');
    },

    removeProductRow: function () {
        $(this).closest('.row').remove();
    },

    handleProductChange: function () {
        var product_id = $(this).val();
        var product_price = ProductManager.products_prices[parseInt(product_id)];
        $(this).closest('.row').find('#product_price').val(product_price);
    },

    fetchDetails: function () {
        var formData = $('form').serializeArray();
        var products_details = [];
        var products_qty = [];

        $('select[name="product"] option:selected').each(function () {
            var productName = $(this).text().trim();
            if (productName !== "--Select--") {
                products_details.push(productName);
            }
        });

        for (var i = 0; i < formData.length; i++) {
            var element = formData[i];
            switch (element.name) {
                case 'qty':
                    var quantity = element.value;
                    products_qty.push(quantity);
                    break;
            }
        }

        var details = products_details.map(function (value, index) {
            return { product: value, quantity: products_qty[index] };
        });
        return details;
    },

    printDetails: function () {
        var detailsArray = this.fetchDetails();
        console.log(detailsArray);
    }
};


$(document).ready(function () {
    ProductManager.init();
});
