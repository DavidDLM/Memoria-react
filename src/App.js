import React, { useEffect, useState } from 'react';
import Card from './components/Card';
//import {shuffle} from 'lodash';

/**Imagenes */
import coal from "../public/images/coal.png";
import iron from "../public/images/iron.png";
import diamond from "../public/images/diamond.jpg";
import emerald from "../public/images/emerald.jpg";
import gold from "../public/images/gold.jpg";
import redstone from "../public/images/redstone.jpg";
import lapis from "../public/images/lapis.jpg";
import quartz from "../public/images/qua.png";


function App() {
  const Images = [
    {id:1, "src": coal, stat: false},
    {id:2, "src": iron, stat: false},
    {id:3, "src": diamond, stat: false},
    {id:4, "src": emerald, stat: false},
    {id:5, "src": gold, stat: false},
    {id:6, "src": redstone, stat: false},
    {id:7, "src": lapis, stat: false},
    {id:8, "src": quartz, stat: false}
  ]//.sort(() => Math.random() - 0.5)) 

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [foundPairs,setFoundPairs] = useState([]);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, disable] = useState(false);
  const [won, setWon] = useState(false);
  

  //Shuffle
  const shuffleCards = () =>{
    const shuffledCards = [...Images, ...Images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCardOne(null);
    setCardTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //Card
  const handleCard = (card) =>{
    cardOne? setCardTwo(card) : setCardOne(card);
  }

  //Comparar
  useEffect(()=>{
    if (cardOne && cardTwo){
      disable(true);
      if(cardOne.src === cardTwo.src){
        /**if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }*/
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === cardOne.src){
              return {...card, stat: true};
            }else{
              return card;
            }
          })
        })
        resetTurn();
      }else{
        setTimeout(()=>resetTurn(),1000);
      }
    }
  },[cardOne, cardTwo]);


  //Reset
  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns(prevTurns => prevTurns+1);
    disable(false);
  }

  //Inicio
  useEffect(()=>{
    shuffleCards();
  },[])

  return (
    <div className="App">
      <h1>Memoria</h1>
      <div className='control'>
        <div className='control_left'>
          <p>Turnos: {turns}</p>
        </div>      
        <div className='control_right'>
          <button onClick={shuffleCards}>Nueva partida</button>
        </div>      
      </div>
      <div className='container'>
        {cards.map(card => (
          <Card 
          key = {card.id} 
          card={card}
          handleCard = {handleCard}
          active={card === cardOne || card === cardTwo || card.stat}
          disabled={disabled}
          />
        ))}
      </div >
    </div>
  );
}

export default App;
