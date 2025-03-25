import Card from './Card';
import { useNavigate } from 'react-router-dom';
 
function GameBoard({ Cards, UpCard, Data}) { 
  const navigate = useNavigate();

  function getOptimalWidth( area) {
    let bestDivisor  = 1;
    for (let index = 1; index <= Math.sqrt(area); index++) {
      if ( area % index === 0) bestDivisor  = area / index;
    }
    return bestDivisor ;
  }

  return (
    <>
        { Cards ? <ul className='GameBoard' style={{ "--widthCard": String(100/getOptimalWidth( Cards.length)) + "%" }}>
          { Cards.map( card => (
            <li className='Card' key={card.id}>
              <Card Card={ card} UpCard={UpCard} ColorCard={Data.colorCard} Color={Data.color}></Card>
            </li>
          ))}
        </ul> : <>Game lỗi!!!!!!!</>}
        <button onClick={ () => navigate("/")}>Menu</button>
    </>
  ); 
} 
 
export default GameBoard;