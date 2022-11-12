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