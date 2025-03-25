import React from 'react'; 


function Card({ Card, UpCard , ColorCard, Color}) { 
  return ( 
    <div 
      className={`card ${Card.isUp ? "flipped" : ""}`} 
      onClick={() => UpCard(Card)}
    >
      <div className="card-inner" style={{ "--colorCard": ColorCard, "--color": Color}}>
        <div className={'card-front'}>{Card.type}</div>
        <div className="card-back">?</div>
      </div>
    </div>
  ); 
} 
 
export default Card;
