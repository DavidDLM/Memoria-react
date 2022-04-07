import { useEffect, useState } from 'react';
import Card from './components/Card';
//import {shuffle} from 'lodash';

function App() {
  const Images = [
    {id:1, "src": "/images/coal.png", stat: false},
    {id:2, "src": "/images/iron.png", stat: false},
    {id:3, "src": "/images/diamond.jpg", stat: false},
    {id:4, "src": "/images/emerald.jpg", stat: false},
    {id:5, "src": "/images/gold.jpg", stat: false},
    {id:6, "src": "/images/redstone.jpg", stat: false},
    {id:7, "src": "/images/lapis.jpg", stat: false},
    {id:8, "src": "/images/qua.png", stat: false}
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
      <button onClick={shuffleCards}>Nueva partida</button>
      
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
      <p>Turnos: {turns}</p>
    </div>
  );
}

export default App;
