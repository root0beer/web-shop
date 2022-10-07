import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";

import AppContext from '../../context';

import "./Card.modules.scss";


const Card = ({
  id,
  title,
  imageUrl,
  price,
  onFavourite,
  onPlus,
  favourited = false,
  loading = false
}) => {//every property you mentioned in APP.js Card component, will be passed alltogether in props variable
  //console.log(props);//you gonna get two results here, because you have 2 Card

  
  const {isItemAdded} = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);
  const itemObj = { id, parentId: id, title, imageUrl, price };


  const onClickPlus = () => {
    onPlus(itemObj);//here we specify what properties function has when we call it
    //!isAdded means that whatever value true/false it has, it will be inverted.
  }


  const onClickFavourite = () => {
    onFavourite(itemObj);
    setIsFavourite(!isFavourite);
  }

  return (
    <div className="card">
      {
        loading ? <ContentLoader
          speed={2}
          width={151}
          height={193}
          viewBox="0 0 151 193"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="128" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="167" rx="8" ry="8" width="80" height="24" />
          <rect x="118" y="157" rx="8" ry="8" width="32" height="32" />
        </ContentLoader> :
          <> {/**you can use fragment <> instead of <div> if you have a need to wrap smth in a parent fragment */}
            {onFavourite && (<div className="favorite" onClick={onClickFavourite}>
              <img src={isFavourite ? "/icons/like_icon.svg" : "/icons/nolike_icon.svg"} alt="unliked" />
            </div>)}
            <img
              width={133}
              height={112}
              src={imageUrl}
              alt="Sneakers"
            />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Price</span>
                <b>${price}</b>
              </div>
              {/**Button is HTML component, you can only use inbuilt functions like onClick, onCursorDown */}
              {onPlus && (<img className="plus"
                onClick={onClickPlus}
                src={isItemAdded(id) ? "icons/added_icon.svg" : "icons/add_icon.svg"}
                alt=":lus"
              />)}
            </div>
          </>
      }

    </div>
  );
}

export default Card;