# Context
 
## Provide it
 
 
```javascript
import React from 'react';
 
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    remoteItem: (id) =>{}
})
 
export default CartContext;
```
 
 
 
```javascript
import CartContext from './cart-context';
 
const CartProvider = (props) => {
   
    const addItemToCartHandler = (itme) =>{};
 
    const removeItemFromCartHandler = (id) => {};
   
    const cartContext = {
        items:[],
        totalAMount:0,
        addItem: addItemToCartHandler,
        remoteItem: removeItemFromCartHandler
    }
return <CartContext.Provider value={cartContext}>
    {props.children}
</CartContext.Provider>
}
 
export default CartProvider;
```
 
```javascript
import { useState} from 'react';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider';
 
function App() {
  const [cartIsShown, setCartIsShown] =useState(false);
 
  const showCartHandler = () => {
    setCartIsShown(true);
  }
 
  const hideCartHandler = () => {
    setCartIsShown(false);
  }
 
  return (
    <CartProvider>
    {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}
 
export default App;
```
 
## Use it
 
```javascript
import {useContext} from 'react';
 
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'
import classes from './HeaderCartButton.module.css'
 
const HeaderCartButton =(props) =>{
    const cartCtx = useContext(CartContext);
 
    const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=>{
        return curNumber + item.amount
    },0)
 
return (
    <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
)
}
 
export default HeaderCartButton
```
 
# useReducer
 
```javascript
import {useReducer} from 'react';
import CartContext from './cart-context';
 
 
const defaultCartState = {
    items : [],
    totalAmount:0
}
 
const cartReducer = (state, action) => {
    if(action.type ==='ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    return {
        items: updatedItems,
        totalAmount:updatedTotalAmount
    }
    }
    return defaultCartState;
}
 
const CartProvider = (props) => {
   
    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState)
 
    const addItemToCartHandler = (item) =>{
      dispatchCartAction({type:'ADD', item:item});  
    };
 
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type:'REMOVE', id:id})
    };
   
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        remoteItem: removeItemFromCartHandler
    }
return <CartContext.Provider value={cartContext}>
    {props.children}
</CartContext.Provider>
}
 
export default CartProvider;
```


# Add data to firebase

 ![image](https://user-images.githubusercontent.com/104289891/205251162-eb3a1d1f-8d49-4081-b2c8-f030e85a24ab.png)


Function in useeffect should not return a promise

Async function alwars return a promise


# useRef()

Get the value of input after it’s submitted


```javascript
import classes from './Checkout.module.css';
import {useRef} from 'react'
 
const Checkout = (props) => {
 
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
 
  const confirmHandler = (event) => {
    event.preventDefault();
 
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value
  };
 
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
 
export default Checkout;
```

# useContext()

https://github.com/fredericreact/foodorder/commit/06c3046e593c473c30f7d8cefda04b6f2a2d4bcc 


```javascript
import React from 'react';
 
const CartContext = React.createContext({
    
    clearCart: ()=>{},
})
 
export default CartContext;
```

```javascript
import {useReducer} from 'react';
import CartContext from './cart-context';
 
const defaultCartState = {
    items : [],
    totalAmount:0
}
 
const cartReducer = (state, action) => {
    
if (action.type ==='CLEAR') {
    return defaultCartState
}
 
    return defaultCartState;
}
 
const CartProvider = (props) => {
 
    const clearCartHandler = () => {
        dispatchCartAction ({type: 'CLEAR'})
    }
 
    const cartContext = {
   
        clearCart: clearCartHandler
    }
 
return <CartContext.Provider value={cartContext}>
    {props.children}
</CartContext.Provider>
}
 
export default CartProvider;
```

```javascript
import React, {useContext, useState} from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem';
import Checkout from './Checkout'
 
const Cart = (props) =>{
 
const cartCtx=useContext(CartContext)
 
const submitOrderHandler = async (userData) => {
cartCtx.clearCart()
}
 
return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
)
}
 
export default Cart;

```