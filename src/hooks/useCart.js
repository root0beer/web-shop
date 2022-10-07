import {useContext} from "react";
import AppContext from "../context";

//you can put export here or at the end export default
//its better to say export here, standard.
export const useCart = () => {
    const { cartItems, setCartItems } = useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

    return { cartItems, setCartItems, totalPrice };
};

