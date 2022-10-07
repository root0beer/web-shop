//you need to type .jsx when you using react. For example, App.js would be better to say App.jsx. But Card.js can stay .js
//type rafce next time to create a component

import React from 'react';
import Card from "../components/Card";//in order to just write "Card" instead of folders Card/Card. You need to rename Card.js to index.js in the same folder with your component.

const Home = ({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavourite,
    onAddtoCart,
    isLoading
}) => {

    const renderItems = () => {
        const filteredItems = items.filter(item => 
            item.title.toLowerCase().includes(searchValue.toLowerCase()));//Searches for exact match. Will not show puma if there is Puma 
        return (isLoading
            ? [...Array(12)]
            : filteredItems
        )
            .map(
                (
                    item, index //map and not forEach because in react you have to use arr.map. map does not change the initial array and map returns a new array
                ) => (
                    <Card
                        key={index}// index is not ideal option to use, DONT do this. Its better to get id from the data pull
                        onFavourite={(obj) => onAddToFavourite(obj)}
                        onPlus={(obj) => onAddtoCart(obj)} //Card is not html tag, it is a custom component, so you are allowed to name any function however you want
                        //whe its loading, you pass "undefined" to isItemAdded, to avoid that you need to:
                        //you can omiit = {true}, because if you just write it, it is going to be true
                        //find. returns undefined. some. returns false  if found none
                        loading={isLoading}
                        {...item}
                    //onPlus in Card-index.js has properties as title, imageUrl, price. We took it from there
                    />
                )
            )
    };
    return (
        <div className="content p-40">
            {/**when you use outside macro css you can still use regular names for components. Write them first and then mention in scss file */}
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Search request:"${searchValue}"` : "All Sneakers"}</h1>
                <div className="search-block d-flex">
                    <img src="/icons/search_icon.svg" alt="Search" />
                    {/**In react its best to show alt="placeholerText" in case if the image doesnt load you will have smth showing there */}
                    {searchValue &&
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear cu-p"
                            src="/icons/btnRemove_icon.svg"
                            alt="Clear"
                        />
                    }
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Searching..." />
                    {/*react recomends doing controlled imput, controled imput is when you put value in the input brackets*/}
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;