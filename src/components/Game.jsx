// src/components/Game.js
import React, { useState, useEffect } from "react";
import Card from "./Card";
import { CSSTransition } from "react-transition-group";
import "./Game.css";

const images = [
  "https://images.healthshots.com/healthshots/en/uploads/2022/08/28211655/romance-1600x900.jpg",
  "https://img.etimg.com/thumb/msid-72898133,width-640,height-480,imgsize-342865,resizemode-4/concept-of-love-different-with-different-language.jpg",
  "https://media.tenor.com/i-ciHIyFVJUAAAAM/iloveyou-so-much.gif",
  "https://static8.depositphotos.com/1074995/852/v/450/depositphotos_8523313-stock-illustration-i-love-you-hand-lettering.jpg",
];

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showEndMessage, setShowEndMessage] = useState(false);

  useEffect(() => {
    const shuffledCards = shuffleArray([...images, ...images]);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        setShowEndMessage(true);
      }, 500);
    }
  }, [matchedCards, cards]);

  const handleFlip = (index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(index) &&
      !matchedCards.includes(index)
    ) {
      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);
      if (newFlippedCards.length === 2) {
        setMoves(moves + 1);
        if (cards[newFlippedCards[0]] === cards[newFlippedCards[1]]) {
          setMatchedCards([...matchedCards, ...newFlippedCards]);
          setFlippedCards([]);
        } else {
          setTimeout(() => setFlippedCards([]), 1000);
        }
      }
    }
  };

  const restartGame = () => {
    const shuffledCards = shuffleArray([...images, ...images]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setShowEndMessage(false);
  };

  return (
    <div className="p-2 mr-1">
      <h1 className="text-3xl text-[#ff6f61] font-bold text-center mb-5 mt-5">
        Memory Match Game
      </h1>
      <p className="text-center mt-1 text-2xl mb-10">Moves: {moves}</p>
      <div className="grid-container lg:ml-20">
        {cards.map((image, index) => (
          <Card
            key={index}
            index={index}
            image={image}
            isFlipped={
              flippedCards.includes(index) || matchedCards.includes(index)
            }
            onFlip={handleFlip}
          />
        ))}
      </div>
      {matchedCards.length === cards.length && (
        <CSSTransition
          in={showEndMessage}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className="end-message">
            <p className="text-3xl font-bold">I Love You!</p>
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3I3djJ0cGp4cnFwM2h6ZTUzc2ttdW41ZTkwNHZuYzJvajk1Z2ZnYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E5oLOBCawmPsRBenft/giphy.webp"
              alt="Iloveyou"
            />
            <button onClick={restartGame}>Play Again</button>
          </div>
        </CSSTransition>
      )}
    </div>
  );
};

export default Game;
