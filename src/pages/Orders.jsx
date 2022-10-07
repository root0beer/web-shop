//you need to type .jsx when you using react. For example, App.js would be better to say App.jsx. But Card.js can stay .js
//type rafce next time to create a component

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from "../components/Card";
// import AppContext from '../context';

const Orders = () => {
  // const { onAddtoCart, onAddToFavourite } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    //another option to write async await functions inside useEffect;
    //self calling function:
    (async () => {
      try {
        const { data } = await axios.get("https://632df9292cfd5ccc2afa3394.mockapi.io/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoadingOrders(false);
      } catch (error) {
        alert("whatever you did was unsucessful. A i know. Order processing failed. Sry");
        console.error(error);
      }

    })();//this () means its being called immediately

  }, []);

  return (
    <div className="content p-40">
      {/**when you use outside macro css you can still use regular names for components. Write them first and then mention in scss file */}
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Orders</h1>

      </div>

      <div className="d-flex flex-wrap">
        {(isLoadingOrders ? [...Array(12)] : orders )
          .map(
            (
              item, index //map and not forEach because in react you have to use arr.map. map does not change the initial array and map returns a new array
            ) => (
              <Card
                key={index}
                loading={isLoadingOrders}
                {...item} />
            )
          )}
      </div>
    </div>
  )
}

export default Orders;