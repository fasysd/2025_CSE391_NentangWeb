import React, { useState } from 'react'; 
import Card from './Card';
 
function GameMenu({ Data, StartGame}) { 
  const [ _formData, _setFormData] = useState(Data);
  const [_demoCard, _setDemoCard] = useState({
    type: 0,
    isUp: false,
  });

  const _handleSubmit = (e) => {
    e.preventDefault();
    StartGame( _formData);
  }

  const _handleChange = (e) => {
    _setFormData({
      ..._formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='GameMenu'>
        <h1>Menu</h1>
        <div className='FormData'>
          <Card Card={_demoCard}
            UpCard={() => _setDemoCard( { ..._demoCard, isUp: !_demoCard.isUp})} 
            ColorCard={_formData.colorCard} Color={_formData.color}/>
          <label>Level: {_formData.level}</label>
        </div>
        <form onSubmit={_handleSubmit} className='Form'>
          <label>Tên người chơi: </label>
            <input type="text" name="name" value={_formData.name} onChange={_handleChange}/>
          <br></br>
          <label>Chọn level: </label>
            <input type="range" name="level" min="1" max="3" step="1" value={_formData.level} onChange={_handleChange}></input>
          <br></br>
          <label>Màu mặt lưng: </label>
            <input type='color' name="colorCard" value={_formData.colorCard} onChange={_handleChange}></input>
          <br/>
          <label>Màu thẻ bài: </label>
            <input type='color' name="color" value={_formData.color} onChange={_handleChange}></input>
          <button type='submit'>Bắt đầu</button>
        </form>
    </div>
  ); 
} 
 
export default GameMenu;