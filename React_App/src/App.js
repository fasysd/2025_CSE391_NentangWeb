import './App.css';
import React from "react";
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import GameMenu from './_components/GameMenu';
import GameBoard from './_components/GameBoard';
import { useEffect, useState } from 'react';
import ScoreBoard from './_components/ScoreBoard';

function App() {
  const [_cards, _setCards] = useState( null);
  const [_card1, _setCard1] = useState( null);
  const [_card2, _setCard2] = useState( null);
  const [_data, _setData] = useState({
      name: "Chưa có tên",
      score: 0,
      level: 1,
      colorCard: "darkblue",
      color: "red",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (_card1 && _card2) {
      setTimeout(_checkCards, 500);
    }
  }, [_card1, _card2]);

  function _startGame(newData) {
    //Đặt lại dữ liệu
    _setCard1(null);
    _setCard2(null);
    _setData({
      ...newData,
      score: 0,
    });

    const gridSize = newData.level == 1 ? 8 : (newData.level == 2 ? 16 : 24);
    let listType = Array.from({ length: gridSize / 2 }, (_, i) => i);
    listType = [...listType, ...listType]; // Nhân đôi danh sách

    // xáo trộn danh sách thẻ
    for (let i = listType.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listType[i], listType[j]] = [listType[j], listType[i]];
    }

    const newListCards = listType.map((type, index) => ({
      id: index,
      type,
      isCollected: false,
      isUp: false,
    }));

    _setCards(newListCards);
    navigate("/GameBoard");
  }

  function _endGame(){
    setTimeout(() => {
      navigate( "/");
    }, 500);
  };
  //Lật thẻ dược chọn
  function _upCard(card) {
    //không lật thẻ đã lật và không cho lật 3 thẻ cùng lúc
    if (card.isUp || _card2) return;

    const newListCards = _cards.map(c =>
      c.id === card.id ? { ...c, isUp: true } : c
    );
    _setCards(newListCards);


    if (_card1) {
      _setCard2(card);
    } else {
      _setCard1(card);
    }
  }
  //Úp tất cả thẻ sai
  function _downAllCard() {
    const newListCards = _cards.map(c =>
      !c.isCollected ? { ...c, isUp: false } : c
    );
    _setCards(newListCards);
  }
  //Kiểm tra thẻ
  function _checkCards() {
    if (!_cards || !_card1 || !_card2) return;

    // Đánh dấu thẻ đã ghép đúng
    if (_card1.type === _card2.type && _card1.id !== _card2.id) {
      //Cập nhật trạng thái thẻ
      _setCards(prevCards =>
        prevCards.map(c =>
          c.id === _card1.id || c.id === _card2.id ? { ...c, isCollected: true } : c
        )
      );
      //Cộng điểm
      _setData(prevData => {
        const newScore = prevData.score + 2;
        if (newScore === _cards.length) _endGame();
        return { ...prevData, score: newScore };
      });
    } else {
      setTimeout(() => {
        _downAllCard();
      }, 200);
    }
    _setCard1(null);
    _setCard2(null);
  }

  const _link_menu = ( a) => <Link to="/">{a}</Link>;

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GameMenu Data={_data} StartGame={ _startGame}></GameMenu>}></Route>
        <Route path='/GameBoard' element={<>
          <ScoreBoard Data={_data}/>
          <GameBoard Cards={_cards} Data={_data} UpCard={_upCard} MenuPage={_link_menu} />
        </>}></Route>
      </Routes>
    </div>
  );
}

export default App;
