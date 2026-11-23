import {cart} from '../../data/cart.js'
import {products} from '../../data/product.js'
import {MoneyChanging} from './money-change.js'
import {deliveryOptions} from '../../data/deliveryOption.js'

export function CalculateTotalPayment() {
  let SummaryCents = 0;
    let SummaryDollar = 0;
    cart.cartItems.forEach((cartItem) => {
      let cartPayment = 0;
      products.forEach((product) => {
        if (cartItem.id === product.id) {
          cartPayment = product
          SummaryCents += Number(cartPayment.priceCents)
        }
      })
    })
  
    SummaryDollar = MoneyChanging(SummaryCents)
  
    let ShipPay = 0;
    cart.cartItems.forEach((cartItem) => {
      deliveryOptions.forEach((deliveryOption) => {
        if (deliveryOption.id === cartItem.deliveryId) {
          ShipPay += Number(MoneyChanging(deliveryOption.deliveryPriceCents))
        }
      })
    })
  
    const TotalBeforeTax = MoneyChanging(SummaryDollar *100 + ShipPay * 100)
    const Tax = MoneyChanging(TotalBeforeTax * 10)
    const TotalPayment = MoneyChanging(TotalBeforeTax *100 + Tax * 100)
    const SummaryCalculations = {
      SummaryDollar,
      ShipPay,
      TotalBeforeTax,
      Tax,
      TotalPayment
    }
    return SummaryCalculations
}