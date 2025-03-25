import React, { useState } from 'react'; 
 
function ScoreBoard({ Data}) { 
  return (
    <div className='ScoreBoard'>
        <label>Name: {Data.name}</label>
        <label>Level: {Data.level}</label>
        <label>Scrore: {Data.score}</label>
    </div>
  ); 
} 
 
export default ScoreBoard;