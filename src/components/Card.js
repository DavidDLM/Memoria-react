import React from 'react';
import "./Card.css";
import cover from "../../public/images/cover.jpg";

export default function Card({card, handleCard, active, disabled}){

    const handleClick = () =>{
        if(!disabled){
            handleCard(card);
        }       
    }

    return(
        <div className="card">
            <div className={active? "active" : ""}>
              <img className="front" src={card.src} alt="" />
              <img 
                className="back" 
                src={cover}
                onClick={handleClick} 
                alt="" />
            </div>
        </div>
    )
}
