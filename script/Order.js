import {cart} from '../data/cart.js'
import {products} from '../data/product.js'
import {deliveryOptions} from '../data/deliveryOption.js'
import {DateCalculate} from './utils/shipping-date-calculate.js'
import {CalculateTotalPayment} from './utils/total-payment.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

console.log(cart.UpdateOrderCount())
document.querySelector('.order-count').innerHTML = cart.UpdateOrderCount();

let html = '';
cart.cartItems.forEach((cartItem) => {
  const id = cartItem.id;
  const quantity = cartItem.quantity;
  const deliveryId = cartItem.deliveryId;

  let OrderProduct;
  products.forEach((product) => {
    if (id === product.id) {
      OrderProduct = product
    }
  })

  let ShippingOption
  deliveryOptions.forEach((option) => {
    if (deliveryId === option.id) {
      ShippingOption = option
    }
  })

  const today = dayjs();
  const deliveryDate = today.add(ShippingOption.deliveryTime, 'days');
  const deliveryHTML = deliveryDate.format('MMMM D');

  html += `
    <div class="grid-order-product">
      <div class="contain-product-img">
        <img class="img" src="./${OrderProduct.image}">
      </div>
      <div class="contain-order-product-information">
        <p class="product-name">
          ${OrderProduct.name}
        </p>
        <p class="shipping-date">
          Arriving on: ${deliveryHTML}
        </p>
        <p class="quantity">
          Quantity: ${quantity}
        </p>
        <button class="button-buy-again">
          <img class="icon-buy-again" src="./images/icons/buy-again.png">
          <p class="p-buy-again">Buy it again</p>
        </button>
        
      </div>
      <a href="Tracking.html" class="contain-button-track-package js-track-package" data-trackpackage-id="${id}">
        <button class="track-package">Track package</button>
      </a>
    </div>
  `
})

document.querySelector('.flex-order-products')
  .innerHTML = html

const GetSummaryCalculations = CalculateTotalPayment();
const today = dayjs();
const deliveryHTML = today.format('MMMM D');
document.querySelector('.contain-header-detail')
  .innerHTML = `
  <div class="left-header-detail">
    <p class="order-placed">Order Placed:</p>
    <p class="date-delivery">${deliveryHTML}</p>
  </div>
  <div class="mid-header-detail">
    <p class="total-payment">Total:</p>
    <p class="payment-cost">$${GetSummaryCalculations.TotalPayment}</p>
  </div>
  <div class="right-header-detail">
    <p class="order-id">
      Order ID:
    </p>
    <p class="id">
      d1b85841-9279-f415-336b-5b6b60e6004a
    </p>
  </div>
  `

let productOrder;
document.querySelectorAll('.js-track-package')
  .forEach((TrackPackage) => {
    const TrackPackageId = TrackPackage.dataset.trackpackageId
    TrackPackage.addEventListener('click', () => {
      cart.cartItems.forEach((cartItem) => {
        if (cartItem.id === TrackPackageId) {
          productOrder = cartItem
          
          localStorage.setItem('productOrder', JSON.stringify(productOrder));
        }
      })
    })
  })

