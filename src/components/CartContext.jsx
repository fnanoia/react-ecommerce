import { createContext, useState } from "react";

export const context = createContext();

const Provider = context.Provider;

export const FunctionProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    const isOnCart = (id) =>{
        const cartFind = cart.find(((prod) => (prod.id === id)));
        if (cartFind !== undefined) {
            return true;
        }else{
            return false}
    }

    const updateWidget = () =>{
        let quantity = 0;
        cart.forEach((product) => {
            quantity = quantity + product.quantity;
        });
        return quantity
    }

    const totalPrice = () =>{
        let total = 0;
        cart.forEach((product) => {
            total = total + (product.price * product.quantity);
        });
        return total
    }
    
    const addProduct = (product, quantity) =>{
        
        const cartSpread = [...cart];
        const new_product = {...product, quantity};

        if(isOnCart(product.id)){
            console.log(`${product.title} ya se agrego al carrito`);  
        }else{
            cartSpread.push(new_product);
            setCart(cartSpread);
            setQuantity(new_product.quantity);
            setTotal(new_product.price);

            console.log(`Agregado al carrito: x${quantity} ${product.title} $${product.price}`);
        }
    }

    const removeProduct = (id) =>{
        const cartFilter = cart.filter((prod) => (prod.id !== id));
        setCart(cartFilter);
    }

    const clearCart = () =>{
        setCart([]);
    }

    const contextValues = {
        cart : cart,
        quantity: quantity,
        total : total,
        addProduct : addProduct,
        isOnCart : isOnCart,
        updateWidget : updateWidget,
        removeProduct : removeProduct,
        clearCart : clearCart,
        totalPrice : totalPrice
    }

    return(
        <Provider value={contextValues}>
            {children}
        </Provider>
    )
}


