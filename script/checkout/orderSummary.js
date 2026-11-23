import{cart} from '../../data/cart.js';
import {products} from '../../data/product.js';
import {MoneyChanging} from '../utils/money-change.js'
import {deliveryOptions} from '../../data/deliveryOption.js'
import {renderPaymentSummary} from './paymentSummary.js'
import {DateCalculate} from '../utils/shipping-date-calculate.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

export function renderOrderSummary() {
  cart.UpdateOrderCount()

  document.querySelector('.checkout-count')
    .innerHTML = `${cart.UpdateOrderCount()} items`

  let HTML = '';


  cart.cartItems.forEach((cartItem,index) => {
    const productID = cartItem.id;

    let CartOrder = '';

    products.forEach((product) => {
      if (productID === product.id) {
        CartOrder = product
      }
    });

    
    const deliveryOptionID = cartItem.deliveryId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (deliveryOptionID === option.id) {
        deliveryOption = option
      }
    });
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
    const deliveryHTML = deliveryDate.format('dddd, MMMM D');

    HTML +=`
      <div class="product js-product-${cartItem.id}">
          <p class="delivery-date">Delivery date: ${deliveryHTML}</p>
          <div class="grid-product-detail">
            <img class="product-img" src="${CartOrder.image}">
            <div class="flex-product-name-cost-quantity">
              <p class="product-name">${CartOrder.name}</p>
              <p class="cost">
                $${CartOrder.getPrice()}
              </p>
              <div class="flex-product-quantity-setting">
                <p class="product-quantity">Quantity: ${cartItem.quantity}</p>
                <p class="product-update">Update</p>
                <p class="product-delete" data-product-id="${cartItem.id}">Delete</p>
              </div>
            </div>
            <div class="flex-delivery-date-option">
              <p class="header-delivery-option">          
                Choose a delivery option:
              </p>
              ${deliveryOptionHTML(productID,cartItem,index)}
            </div>
          </div>
        </div>
    `
    document.querySelector('.product-place')
      .innerHTML = HTML
  })




  function deliveryOptionHTML(productID,cartItem,index) {
    let html = '';

    deliveryOptions.forEach((option,deliveryIndex) => {


      const deliveryPriceHTML = option.deliveryPriceCents === 0
        ? 'FREE'
        : `$${MoneyChanging(option.deliveryPriceCents)} -`

      const IsChecked = option.id === cartItem.deliveryId
        ? 'checked' 
        : '';


      html +=
      `<label class="flex-chosen-option-ship js-chosen-option-ship" data-delivery-id="${productID}" data-delivery-option="${deliveryIndex}">
        <input class="chosen" type="radio" name="product-${index}" value="free" ${IsChecked}>
        <div class="flex-ship-detail">
          <p class="ship-date">
            ${DateCalculate(option.deliveryTime)}
          </p>
          <p class="cost-ship">${deliveryPriceHTML} Shipping</p>
        </div>
      </label>
      `})
    return html;
  }

  document.querySelectorAll('.js-chosen-option-ship')
    .forEach((option) => {
      option.addEventListener('click',() => {
        const deliveryID = option.dataset.deliveryId;
        let deliveryOption = option.dataset.deliveryOption;
        cart.cartItems.forEach((cartItem) =>{
          if (deliveryID === cartItem.id) {
            cartItem.deliveryId = Number(deliveryOption)
          }
        })
        
        cart.saveToStorage();  

        renderOrderSummary();
        renderPaymentSummary()
      })
    })

  

  document.querySelectorAll('.product-delete')
    .forEach((link) => {
      link.addEventListener('click',() => {
        const productID = link.dataset.productId;  
        
        cart.DeteleProduct(productID);


        cart.saveToStorage()

        const productDelete = document.querySelector(`.js-product-${productID}`)


        productDelete.remove();

        renderOrderSummary();
        renderPaymentSummary();
      })
  })

  
  if (cart.length === 0) {
    document.querySelector('.product-place')
      .innerHTML = `
        <p>Your cart is empty.</p>
        <a href="Amazon.html">
          <button class="view-products">
            View products
          </button>
        </a>
      `
  }
}


renderOrderSummary()