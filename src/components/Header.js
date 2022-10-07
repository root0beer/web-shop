import React from 'react';
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = (props) => {
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            {/**thats macro-css, each name "d-flex" means smth in css language, like display: flex. easier */}
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="photos/websitelogo.png" alt="Logotype" />
                    <div>
                        <h3 className="text-uppercase">React sneakers</h3>
                        <p className="opacity-5">Best sneakers shop</p>
                    </div>
                </div>
            </Link>{/**Link helps us to reload only a certain part, and a href reloads the whole page */}
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="icons/cart_icon.svg" alt="IconCart" />
                    <span> {totalPrice} USD </span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favourites">
                        <img width={18} height={18} src="icons/heart_icon.svg" alt="IconHeart" />
                    </Link>
                </li>
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="icons/person_icon.svg" alt="IconPerson" />
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;