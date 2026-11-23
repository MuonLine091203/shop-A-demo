class Cart{
  cartItems;
  localStorageKey;


  cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];


  saveToStorage() {
    localStorage.setItem('cartItem', JSON.stringify(this.cartItems));
  }

  UpdateOrderCount(){
    let OrderCount = 0;
    this.cartItems.forEach((count) => {
      OrderCount += Number(count.quantity);
    })
    return OrderCount
  }

  AddItem(productID) {
    let ItemAdded;

    this.cartItems.forEach((cartItem) => {
      if(productID === cartItem.id) {
        ItemAdded = cartItem
      }
    })
    
    if (ItemAdded) {
      ItemAdded.quantity ++;
    } else {
      this.cartItems.push({
        id:productID,
        quantity:1,
        deliveryId:0
      })
    }
  }


  DeteleProduct(productID) {
    const Newcart = [];

    this.cartItems.forEach((cartItem) => {
      if(this.cartItem.id !== productID) {
        Newcart.push(cartItem);
      }
    });

    this.cartItems = Newcart;
  }
}


export const cart = new Cart();

console.log(cart)