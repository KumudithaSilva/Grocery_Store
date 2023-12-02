var productModal = $("#productModal");
    $(function () {
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.products_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });


    $('#saveProduct').on("click", function() {
        var data = $('#productForm').serializeArray();
        var requestPayload = {
            name: null,
            uom_id: null,
            price_per_unit: null
        };

        for (var i=0; i<data.length; ++i){
            var element = data[i];

            switch(element.name){
                case 'name':
                    requestPayload.name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                case 'price':
                        requestPayload.price_per_unit = element.value;
                    
            }
        }

        callApi('POST', productInsertApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });


    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('show.bs.modal', function(){
        $.get(uomListApiUrl, function(response){
            if(response){
                console.log(response)
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom){
                    options += '<option value="' + uom.uom_id +'">'+ uom.um_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
            
        })
    });
    

    
 