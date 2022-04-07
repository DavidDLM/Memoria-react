import "./Card.css"

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
                src="/images/cover.jpg" 
                onClick={handleClick} 
                alt="" />
            </div>
        </div>
    )
}
