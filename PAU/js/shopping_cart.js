$(document).ready(function () {


    // ************************************************
    // Shopping Cart API
    // ************************************************

    var shoppingCart = (function() {
        // =============================
        // Private methods and propeties
        // =============================
        cart = [];
        //console.log('shoping cart func ' + cart);
        // Constructor
        function Item(coursename, courseprice, courseDesc, courseImage, count,thinkificId,courseId,productId) {
            this.coursename = coursename;
            this.courseprice = courseprice;
            this.count = count;
            this.courseDesc = courseDesc;
            this.courseImage = courseImage;
            this.thinkificId=thinkificId;
            this.courseId=courseId;
            this.productId=productId;
        }

        // Save cart
        function saveCart() {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        }

        // Load cart
        function loadCart() {
            cart = JSON.parse(localStorage.getItem('shoppingCart'));
        }
        if (localStorage.getItem("shoppingCart") != null) {
            loadCart();
        }


        // =============================
        // Public methods and propeties
        // =============================
        var obj = {};

        // Add to cart
        obj.addItemToCart = function(coursename, courseprice,courseDesc,courseImage, count,thinkificId,courseId, productId) {
            //console.log('add to cart =' + thinkificId + ' ojid= '+ courseId);
            var itemCountGreaterFive=false;
            for(var item in cart) {
                if(cart[item].coursename === coursename ){
                    //console.log('inner count = ' + cart[item].count);
                    if(cart[item].count>=5)
                    {
                        itemCountGreaterFive=true;
                    }
                    else
                    {
                        itemCountGreaterFive=false;
                    }
                    if(itemCountGreaterFive)
                    {
                        return;
                    }
                    else
                    {
                        cart[item].count ++;
                        saveCart();
                        return;
                    }


                }
            }


            var item = new Item(coursename, courseprice,courseDesc,courseImage, count,thinkificId,courseId, productId);
           // console.log('add to cart = ' + item);

            cart.push(item);
            saveCart();
        }
        // Set count from item
        obj.setCountForItem = function(coursename, count) {
            for(var i in cart) {
                if (cart[i].coursename === coursename) {
                    cart[i].count = count;
                   // console.log('setCountForItem =' + count);
                    break;
                }
            }
        };
        // Remove item from cart
        obj.removeItemFromCart = function(coursename) {
            for(var item in cart) {
                if(cart[item].coursename === coursename) {
                    cart[item].count --;
                    if(cart[item].count === 0) {
                        cart.splice(item, 1);
                    }
                    break;
                }
            }
            saveCart();
        }

        // Remove all items from cart
        obj.removeItemFromCartAll = function(coursename) {
            for(var item in cart) {
                if(cart[item].coursename === coursename) {
                    cart.splice(item, 1);
                    break;
                }
            }
            saveCart();
        }

        // Clear cart
        obj.clearCart = function() {
            cart = [];
            saveCart();
        }

        // Count cart 
        obj.totalCount = function() {
            var totalCount = 0;
            for(var item in cart) {
                totalCount += cart[item].count;
            }
            return totalCount;
        }

        // Total cart
        obj.totalCart = function() {
            var totalCart = 0;
            for(var item in cart) {
                totalCart += cart[item].courseprice * cart[item].count;
            }
            return Number(totalCart.toFixed(2));
        }

        // List cart
        obj.listCart = function() {
            var cartCopy = [];
            for(i in cart) {
                item = cart[i];
                itemCopy = {};
                for(p in item) {
                    itemCopy[p] = item[p];

                }
                itemCopy.total = Number(item.courseprice * item.count).toFixed(2);
                cartCopy.push(itemCopy)
            }
            return cartCopy;
        } 

        // cart : Array
        // Item : Object/Class
        // addItemToCart : Function 
        // removeItemFromCart : Function
        // removeItemFromCartAll : Function
        // clearCart : Function
        // countCart : Function
        // totalCart : Function
        // listCart : Function
        // saveCart : Function
        // loadCart : Function
        return obj;
    })();


    // *****************************************
    // Triggers / Events
    // ***************************************** 
    // Add item
    $('.add-to-cart').click(function() {
        //         event.preventDefault();
        var coursename = $(this).data('name');
        var courseDesc = $(this).data('description');
        var courseImage = $(this).data('image');
        var courseprice = Number($(this).data('price'));
        var thinkificId = $(this).data('thinkificid');
        var courseId    = $(this).data('courseid');
        var productId    = $(this).data('productid');
        
        
        //console.log(thinkificId + "thinkificId");
        //console.log(courseId + "courseid")
 
        shoppingCart.addItemToCart(coursename, courseprice,courseDesc,courseImage, 1,thinkificId,courseId, productId);

    });


    // Delete item button

    $('.show-cart').on("click", ".delete-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCartAll(name);
        displayCart();

    })


    // -1
    $('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')


        shoppingCart.removeItemFromCart(name);
        displayCart();
    })

    // +1
    $('.show-cart').on("click", ".plus-item", function(event) {
        var name = $(this).data('name') ;

        shoppingCart.addItemToCart(name);
        displayCart();

    })

    // Item count input
    $('.show-cart').on("change", ".item-count", function(event) {
        var name = $(this).data('name');
        var count = Number($(this).val() );

        shoppingCart.setCountForItem(name, count);
        displayCart();
    });


    function displayCart() { 
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
        if(cart != null) {

            console.log('display cart = ' + cart);
            // List cart
            var  cartListItems = function() {
                var cartCopy = []; 
                for(i in cart) {
                    item = cart[i];
                    itemCopy = {};
                    for(p in item) {
                        itemCopy[p] = item[p];

                    }
                    itemCopy.total = Number(item.courseprice * item.count).toFixed(2);
                    cartCopy.push(itemCopy)
                }
                return cartCopy;
            }

            var cartArray = cartListItems();
            //console.log(cartArray + ' cartArray');
            var output = " <tr border='0'><th class='width_half'>Course Details</th><th>Quantity</th><th>Price</th><th>Total</th></tr>";

            for(var i in cartArray) {
                output += "<tr>" + "<td class='width_half'><div class='image_name_price'><div class='coure__image'><img src="+ cartArray[i].courseImage +"></div><div class='coure__name_des'><div class='name_section'>" + cartArray[i].coursename + "</div><div class='meta_des'>" + cartArray[i].courseDesc + "</div><div class='delete-item btn btn-danger' data-name='" + cartArray[i].coursename + "'>Remove</div></div></div></td>" 
                    + "<td><div class='input-group'><div class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].coursename + "'>-</div>"
                    + "<input type='number' class='item-count form-control' min='0' max='5' data-name='" + cartArray[i].coursename + "' value='" + cartArray[i].count + "'>"
                    + "<div class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].coursename + "'>+</div></div></td>"
                    + " = " 
                    +"<td class='price_color'>$" + cartArray[i].courseprice + "</td>"
                    + "<td class='price_color'>$" + cartArray[i].total + "</td>" 
                    + "</tr>";    
            }
            $('.show-cart').html(output);
            $('.total-cart').html(shoppingCart.totalCart());
            $('.total-count').html(shoppingCart.totalCount());
        }
        else
        {
            cart = [];
        }

    }


    displayCart();
    //     $('.total-cart').html(shoppingCart.totalCart());


});

