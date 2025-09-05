import React from "react";

function Card({ card, onClick }: any) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <div className={card.isFlipped || card.isMatched ? "flipped" : ""}>
        <img src={card.image} alt="card front" className="front" />
        <div className="back"></div>
      </div>
    </div>
  );
}

export default Card;
