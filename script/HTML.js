import {cart}  from '../data/cart.js';
import {products} from '../data/product.js'
import {MoneyChanging} from './utils/money-change.js'

document.querySelector('.order-count').innerHTML 
  = cart.UpdateOrderCount()

let displayHTML = '';

//localStorage.clear();

products.forEach((product) => {
  displayHTML += `
    <div class="product">
      <div class="img-size">
        <img class="img" src="${product.image}">
      </div>

      <div class="name-size">
        <p class="name">
          ${product.name}
        </p>
      </div>

      <div class="rating-zone">
        <img class="rating" src="${product.getStarUrl()}">
        <p class="rating-count">
          ${product.rating.count}
          </p>
      </div>

      <p class="cost">
        ${product.getPrice()}
      </p>

      <select class="select-value">
        <option class="option" value=1>1</option>
        <option class="option" value=2>2</option>
        <option class="option" value=3>3</option>
        <option class="option" value=4>4</option>
        <option class="option" value=5>5</option>
        <option class="option" value=6>6</option>
        <option class="option" value=7>7</option>
        <option class="option" value=8>8</option>
        <option class="option" value=9>9</option>
        <option class="option" value=10>10</option>
      </select>

      <div class="add-disappear js-added-${product.id}">
        <img class="checkmark-icon" src="images/icons/checkmark.png">
        <p class="added">Added</p>
      </div>

      <button class="cart-zone js-cart-zone-onclick"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `
});
document.querySelector('.js-market')
  .innerHTML = displayHTML;


document.querySelectorAll('.js-cart-zone-onclick')
  .forEach((button) => {
    button.addEventListener('click', () => {
      
      
      const productID = button.dataset.productId;

      cart.AddItem(productID)

      cart.UpdateOrderCount()
    
      const AddedMessage = document.querySelector(`.js-added-${productID}`)


      
      if (AddedMessage._appearTimer) {
        clearTimeout(AddedMessage._appearTimer)
      }

      AddedMessage.classList.add('add-appear')

      AddedMessage._appearTimer = setTimeout(() => {
        AddedMessage.classList.remove('add-appear')
      },2000)
//    .__appearTimer là một phần tử object phụ để lưu 
//    số id của setTimeout(thường là tăng dần từ 1 
//    lên) và if sẽ kt xem AddedMessage._appearTimer
//    đã ấn chưa, nếu đã ấn rồi thi id sẽ ko còn là
//    undefind hay null mà sẽ thành một số làm cho
//    khi mỗi lần ấn vào dù có trước hay sau timeout
//    thì việc appear added vẫn ko bị thiếu hay trùng tg 
      
      cart.saveToStorage()
      
      document.querySelector('.order-count').innerHTML = cart.UpdateOrderCount()

  })
})
