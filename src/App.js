import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";//in order to open new pages without page reload you need to use react router dom library
import axios from "axios";//it is a library to send and receive data in a more convenient to json way
import Drawer from "./components/Drawer";
import Header from "./components/Header"; //you can name it "Shapka", you can name it whatever next to import, coz that space reserved for your variable
import AppContext from "./context";

import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";



function App() {
  const [items, setItems] = useState([]); //we are storing our data here (sneakers)
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);//conditional rendering in React
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //useEffect doesnt work with async functions!!! all useEffects are executed in sync way
    //ONLY when App() function renders, FIRST time, render this too pls // we need to call useEffect to avoid a million of JSON requests
    //FETCH REQUEST EXAMPLE
    // fetch("https://632df9292cfd5ccc2afa3394.mockapi.io/items").then(res => { //this function gets called every time when we mention useState(smth)
    //     return res.json();//give me data in json format. 
    //   }).then(json => {
    //     setItems(json);//when request is successfull, display data in items
    //   });
    //AXIOS REQUESTS EXAMPLE
    //now we about to remake this data request using axios method:

    //if you got multiple server requests, they all are executed in parallel, they dont wait for each other

    //we have created async function because useEffect does not allow us to use async await inside
    async function fetchDataWeb() {
      try {
        setIsLoading(true);
        const [
          cartResponse, 
          favouritesResponse, 
          itemsResponse
        ] = await Promise.all([
          axios.get("https://632df9292cfd5ccc2afa3394.mockapi.io/cart"),
          axios.get("https://632df9292cfd5ccc2afa3394.mockapi.io/favourites"),
          axios.get("https://632df9292cfd5ccc2afa3394.mockapi.io/items"),
        ]);

        setIsLoading(false);

        //setting items separately
        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);

      } catch (error) {
        alert("Data did not fetched");
        console.error(error);
      }
    }
    //we need to immediately call the function we created
    fetchDataWeb();

  }, []);//if no variables hadn't been changed, execute this array at the end

  const onAddtoCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://632df9292cfd5ccc2afa3394.mockapi.io/cart/${findItem.id}`);
        } else {
        //we could say cartItems, but its better to use ramdom variable. 
        //Otherwise theres a chance you can receive "old" data. 
        //everytime we click on Add, we take previous cartItems and add obj to it 
        //(obj is an object of one item we clicked on, contains title price img)  
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post("https://632df9292cfd5ccc2afa3394.mockapi.io/cart", obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item, 
              id: data.id,
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert("Add to Cart was unsuccessful");
      console.error(error);
    }
  };

  const onRemoveCartItem = (id) => {
    try {
      axios.delete(`https://632df9292cfd5ccc2afa3394.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Removal was unsuccessful");
      console.error(error);
    }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://632df9292cfd5ccc2afa3394.mockapi.io/favourites/${obj.id}`)
        setFavourites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        //we decided to delete it from visuals, leaving only backend deletion // setFavourites((prev) => prev.filter(item => item.id !== obj.id))
      } else {
        const { data } = await axios.post("https://632df9292cfd5ccc2afa3394.mockapi.io/favourites", obj);
        setFavourites((prev) => [...prev, data]);
        //we could say cartItems, but its better to use ramdom variable. Otherwise theres a chance you can receive "old" data. everytime we click on Add, we take previous cartItems and add obj to it (obj is an object of one item we clicked on, contains title price img)
      }

    } catch (error) {
      alert("Add to Favs was unsuccessful");
      console.error(error);
    }
  };

  const onChangeSearchInput = ((event) => {
    setSearchValue(event.target.value);
  })

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favourites, isItemAdded, onAddToFavourite, setCartOpened, setCartItems, onAddtoCart }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveCartItem}
          opened={cartOpened}
        />
        {/*conditional rendering, null means dont render anything. Or undefined and && this operator looks for the first false instance. If all are true, renders last one*/}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavourite={onAddToFavourite}
              onAddtoCart={onAddtoCart}
              isLoading={isLoading}

            />} />

          <Route path="/favourites" element={
            <Favourites />
          } />

          <Route path="/orders" element={
            <Orders />
          } />

        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
