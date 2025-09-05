import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import WinModal from "../../components/WinModal";

// Image imports (replace with your own image paths)
import card1 from "../../assets/images/card1.png";
import card2 from "../../assets/images/card2.png";
import card3 from "../../assets/images/card3.png";
import card4 from "../../assets/images/card4.png";
import card5 from "../../assets/images/card5.png";
import card6 from "../../assets/images/card6.png";
import { Box, Button, Typography } from "@mui/material";
import { Leaderboard } from "@mui/icons-material";
import colors from "../../common/colorConstants";
import { useNavigate } from "react-router";
import { rootNames } from "../../common/constants";

// Type for a single card
interface CardType {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardImages: string[] = [card1, card2, card3, card4, card5, card6];

const GameScreen: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstChoice, setFirstChoice] = useState<CardType | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);
  const [winModalOpen, setWinModalOpen] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const shuffleCards = () => {
    const shuffled: CardType[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(0);
    setDisabled(false);
    setWinModalOpen(false);
  };

  const handleChoice = (card: CardType) => {
    if (disabled || card.isFlipped || card.isMatched) return;

    if (!isRunning) {
      setIsRunning(true);
    }

    if (!firstChoice) {
      setFirstChoice(card);
    } else if (!secondChoice && card.id !== firstChoice.id) {
      setSecondChoice(card);
    }

    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);

      if (firstChoice.image === secondChoice.image) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.image === firstChoice.image
              ? { ...card, isMatched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstChoice.id || card.id === secondChoice.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setWinModalOpen(true);
    }
  }, [secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const handleRestart = () => {
    shuffleCards();
    setIsRunning(false);
    setSecondsElapsed(0);
    setCurrentLevel(1);
  };

  return (
    <div className="game-container">
      <Header
        turns={turns}
        // onRestart={() => {
        //   shuffleCards();
        //   setIsRunning(false);
        //   setSecondsElapsed(0);
        //   setCurrentLevel(1);
        // }}
        winModalOpen={winModalOpen}
        currentLevel={currentLevel}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        secondsElapsed={secondsElapsed}
        setSecondsElapsed={setSecondsElapsed}
      />
      {/* <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
      >
        <Button
          onClick={() => navigate(`/${rootNames.LEADERBOARD}`)}
          title="Leaderboard"
          variant="contained"
          sx={{
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            alignSelf: "center",
            fontFamily: "Fredoka, sans-serif",
            fontSize: "14px",
            textTransform: "none",
          }}
        >
          <Leaderboard
            sx={{ color: colors.white, marginBottom: "4px", fontSize: "16px" }}
          />
          Leaderboard
        </Button>
      </Box> */}
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingX: "20px",
        }}
      >
        <div className="card-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleChoice} />
          ))}
        </div>
        {winModalOpen && (
          <WinModal
            turns={turns}
            onRestart={() => {
              shuffleCards();
              if (currentLevel < 3) {
                setCurrentLevel(currentLevel + 1);
              } else {
                setCurrentLevel(1);
                setSecondsElapsed(0);
              }
              setWinModalOpen(false);
              navigate(`/${rootNames.LEADERBOARD}`);
            }}
            currentLevel={currentLevel}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          sx={{
            borderRadius: 0,
            borderWidth: 0,
            p: 0,
            borderBottom: 1,
            lineHeight: 1.5,
          }}
          onClick={handleRestart}
        >
          Restart
        </Button>
      </Box>
    </div>
  );
};

export default GameScreen;
