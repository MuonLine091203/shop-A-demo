import{cart} from '../../data/cart.js';
import {products} from '../../data/product.js';
import {MoneyChanging} from '../utils/money-change.js'
import {deliveryOptions} from '../../data/deliveryOption.js'
import {CalculateTotalPayment} from '../utils/total-payment.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'



export function renderPaymentSummary() {
  
  const GetSummaryCalculations = CalculateTotalPayment()

  document.querySelector('.payment-place')
      .innerHTML = `
      <p class="header-payment">
        Order Summary
      </p>
      <div class="grid-payment-sum">
        <p class="payment-sum-detail">
          Items (${cart.UpdateOrderCount()}):
        </p>
        <p class="payment">$${GetSummaryCalculations.SummaryDollar}</p>
      </div>
      <div class="grid-payment-sum">
        <p class="payment-sum-detail">
          Shipping & handling:
        </p>
        <p class="payment">$${GetSummaryCalculations.ShipPay}</p>
      </div>
      <div class="grid-payment-sum-total-before-tax">
        <p class="payment-sum-detail-total-before-tax">
          Total before tax:
        </p>
        <p class="payment-total-before-tax">$${GetSummaryCalculations.TotalBeforeTax}</p>
      </div>
      <div class="grid-payment-sum">
        <p class="payment-sum-detail">
          Estimated tax (10%):
        </p>
        <p class="payment">$${GetSummaryCalculations.Tax}</p>
      </div>
      <div class="payment-total">
        <p class="order-total">Order total:</p>
        <p class="cost-total">$${GetSummaryCalculations.TotalPayment}</p>
      </div>
      <a href="Order.html">
        <button class="place-your-order js-place-your-order">
          Place your order
        </button>
      </a>
    `
}

const NewCartOrder = [];

//document.querySelector('.js-place-your-order')
//  .addEventListener('click', () => {
//    cart.forEach((cartItem) => {
//      NewCartOrder.push(cartItem);
//     deliveryOptions.forEach((deliveryOption) => {
//        if (cartItem.deliveryId === deliveryOptions.id) {
//          
//        }
//      })
//    })
//    cart = []
//  })