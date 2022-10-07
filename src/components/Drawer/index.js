import React, { useState } from 'react';
import axios from 'axios';

import Info from "../Info";
import {useCart} from "../../hooks/useCart";//{}figure brackets because we exported const not export default

import styles from "./Drawer.module.scss";

//here........V....put time of the delay in a variable form
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [ orderId, setOrderId ] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("https://632df9292cfd5ccc2afa3394.mockapi.io/orders",{
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            //if I would use forEach, await wouldnt wait for the next item.id
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete("https://632df9292cfd5ccc2afa3394.mockapi.io/cart/" + item.id);
                //here.....V... put the time of the delay in miliseconds;
                await delay(1000);
            }
            
        } catch (error) {
            alert("Unsuccessful order");
        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30" >
                    Shopping Cart <img className="removeBtn cu-p" onClick={onClose} src="/icons/btnRemove_icon.svg" alt="Close" /></h2>

                {
                    items.length > 0 ? (
                        <div className="d-flex flex-column flex">
                            <div className="items flex">
                                {items.map((obj) => (

                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div
                                            style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                            className="cartItemImg">{/**regular html would be style = "height:100px". Write {{}} two times indicating you want to pass sum styles */}

                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>${obj.price}</b>
                                        </div>
                                        {/**onRemove: you can use pointer. But when you transfer data, you NEED to use arrow functions, NOT a pointer thats because with a pointer you cannot transfer id*/}
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/icons/btnRemove_icon.svg" alt="Remove" />
                                    </div>

                                ))}

                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Total:</span>
                                        <div></div>
                                        <b>${totalPrice}</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%:</span>
                                        <div></div>
                                        <b>${totalPrice*0.05}</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Proceed <img src="icons/btnarrow_icon.svg" alt="arrow" /></button>
                            </div>
                        </div>) : (
                        <Info
                            title={isOrderComplete ? "Your order is successfuly sent" : "Cart is empty"}
                            description={isOrderComplete ? `Your order No${orderId} will be dispatched from our warehouse in 3-5 hours` : "Add at least one item to proceed"}
                            image={isOrderComplete ? "/photos/order-ready.jpg" : "/photos/empty-cart.png"}
                        />

                    )
                }

            </div>
        </div>
    );
}

export default Drawer;