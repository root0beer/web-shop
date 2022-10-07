//you need to type .jsx when you using react. For example, App.js would be better to say App.jsx. But Card.js can stay .js
//type rafce next time to create a component

import React, {useContext} from 'react';
import Card from "../components/Card";
import AppContext from '../context';//figure brackets help you export what you passed into appContext variable

const Favourites = () => {
  const {favourites, onAddToFavourite} = useContext(AppContext);
 
    return (
    <div className="content p-40">
      {/**when you use outside macro css you can still use regular names for components. Write them first and then mention in scss file */}
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Favourites</h1>

      </div>

      <div className="d-flex flex-wrap">
        {favourites
          .map(
            (
              item, index //map and not forEach because in react you have to use arr.map. map does not change the initial array and map returns a new array
            ) => (
              <Card
                key={index}// index is not ideal option to use, DONT do this. Its better to get id from the data pull
                favourited={true}
                onFavourite={onAddToFavourite}
                {...item}
                 //onPlus in Card-index.js has properties as title, imageUrl, price. We took it from there
              />
            )
          )}
      </div>
    </div>
  )
}

export default Favourites;