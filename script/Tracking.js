import {cart} from '../data/cart.js'
import {products} from '../data/product.js'
import {deliveryOptions} from '../data/deliveryOption.js'
import {DateCalculate} from './utils/shipping-date-calculate.js'
import {CalculateTotalPayment} from './utils/total-payment.js'
import {productOrder} from '../data/productOrder.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

document.querySelector('.order-count').innerHTML = cart.UpdateOrderCount();

let productDetails;
products.forEach((product) => {
  if (product.id === productOrder.id) {
    productDetails = product
  }
})



document.querySelector('.main-page')
  .innerHTML =`
  <a class="header-main-page" href="./Order.html">
      View all orders
    </a>
    <h2 class="shipping-date">Arriving on Friday, August 7</h2>
    <p class="product-name">${productDetails.name}</p>
    <p class="quantity">Quantity: <span>${productOrder.quantity}</span></p>
    <img class="product-img" src="${productDetails.image}">
    <div class="header-progress-bar">
      <p class="preparing">Preparing</p>
      <p class="shipped">Shipped</p>
      <p class="delivered">Delivered</p>
    </div>
    <div class="progress-shipping-bar">
      <div class="progress-bar js-progress-bar" style="width: $%;"></div>
    </div>
  `
console.log(productOrder)