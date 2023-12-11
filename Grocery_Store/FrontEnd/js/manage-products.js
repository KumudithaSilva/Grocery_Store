var productModal = $("#productModal");

updatehide();

    $(function () {
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.products_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.uom_name +'</td>'+
                        '<td>$'+ product.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span> <span class="btn btn-xs btn-info update-product" style="margin-left: 7px;">Update</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
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


    $(document).on("click", ".update-product", function (){
        const tr = $(this).closest('tr');
        const data = {
            product_id : tr.data('id'),
            product_name : tr.data('name'),
            uom_id : tr.data('unit'),
            uom_name : tr.find('td:eq(1)').text(),
            price_per_unit : tr.data('price')
        };

        showProductModel(data);

        $('#updateProduct').on("click", function(){
            updateProduct(tr);
        });
    });

    
    function showProductModel(data){
        productModal.modal('show');
        
        productModal.find('#id').val(data.product_id);
        productModal.find('#name').val(data.product_name);
        productModal.find('#uoms').val(data.uom_id);
        productModal.find('#price').val(data.price_per_unit);
    
        $('.modal-title').text('Update Product');
        updateshow();
    }

    function updateProduct(tr){
        const data = $('#productForm').serializeArray();
        const requestPayload = {
            product_id: null,
            name: null,
            uom_id: null,
            price_per_unit: null
        };
        
        requestPayload.product_id = tr.data('id');
        
        for (var i=0; i<data.length; ++i){
            var element = data[i];
            
            switch(element.name){
                case 'name':
                    requestPayload.name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                        
                }
            }
            
            callApi('POST', productUpdateApiUrl, {
                'data': JSON.stringify(requestPayload)
            });
    
            clear();

    }

    
    productModal.on('hide.bs.modal', function(){
        $('#id').val('0');
        $('#name', '#umos', '#price').val('');

        clear();  
        window.location.reload(); 
    });


    productModal.on('show.bs.modal', function(){
        $.get(uomListApiUrl, function(response){
            if(response){
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom){
                    options += '<option value="' + uom.uom_id +'">'+ uom.um_name +'</option>';
                });
                $("#uoms").empty().html(options);
            }
            
        })
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
                    break;
                case 'price':
                        requestPayload.price_per_unit = element.value;
                    
            }
        }

        callinsertApi('POST', productInsertApiUrl, {
            'data': JSON.stringify(requestPayload)
        });

        clear();
        
    });


    function clear() {
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";

        var uomsSelect = document.getElementById("uoms");
        uomsSelect.selectedIndex = 0;
        
    }


    function updatehide() {
        $('#updateProduct').hide();
        $('#saveProduct').show();
    }

    
    function updateshow() {
        $('#updateProduct').show();
        $('#saveProduct').hide();
    }

    
    
 