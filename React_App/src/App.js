import './App.css';
import React from "react";
import { Routes, Route, Link, useNavigate} from "react-router-dom";
import GameMenu from './_components/GameMenu';
import GameBoard from './_components/GameBoard';
import { useEffect, useState } from 'react';
import ScoreBoard from './_components/ScoreBoard';

function App() {
  const [_cards, _setCards] = useState( null);//Lưu trạng thái của các thẻ bài
  const [_card1, _setCard1] = useState( null);//Bài ngửa số một
  const [_card2, _setCard2] = useState( null);//Bài ngửa số một
  const [_data, _setData] = useState({//Dữ liệu từ người chơi
      name: "Chưa có tên",
      score: 0,
      level: 1,
      colorCard: "darkblue",
      color: "red",
  });

  //Dùng chuyển đổi giữa các Route mà không phải dùng tag <Link/>
  const navigate = useNavigate();

  useEffect(() => {//Kiểm tra bài mỗi khi chọn được 2 lá
    if (_card1 && _card2) {//DK chọn 2 lá
      setTimeout(_checkCards, 500);
    }
  }, [_card1, _card2]);//DK _card1, _card2 thay đổi ( tránh render nhiều lần)

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

    //Tạo danh sách thẻ
    const newListCards = listType.map((type, index) => ({
      id: index,
      type,
      isCollected: false,
      isUp: false,
    }));

    _setCards(newListCards);
    navigate("/GameBoard");//Chuyển sang Route GameBoard để bắt đầu chơi
  }

  function _endGame(){
    setTimeout(() => {
      navigate( "/");//Chuyển sang Route GameMenu
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
    } else { //Thẻ sai
      _downAllCard();
    }
    _setCard1(null);
    _setCard2(null);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<GameMenu Data={_data} StartGame={ _startGame}></GameMenu>}></Route>
        <Route path='/GameBoard' element={<>
          <ScoreBoard Data={_data}/>
          <GameBoard Cards={_cards} Data={_data} UpCard={_upCard}/>
        </>}></Route>
      </Routes>
    </div>
  );
}

export default App;
