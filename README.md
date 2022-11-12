# Context
 
Provide it
 
 
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
 
Use it
 
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
 
useReducer
 
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
