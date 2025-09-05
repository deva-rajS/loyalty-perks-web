import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { formatTime } from "../common/utils";
import StarIcon from "@mui/icons-material/Grade";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const Header = ({
  turns,
  onRestart,
  winModalOpen,
  currentLevel,
  isRunning,
  setIsRunning,
  setSecondsElapsed,
  secondsElapsed,
}: any) => {
  const timerRef = useRef<number | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsElapsed((prev: any) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    console.log("winModalOpen", winModalOpen);
    if (winModalOpen) {
      setIsRunning(false);
      // currentLevel < 3 && setCurrentLevel(currentLevel + 1);
    }
  }, [winModalOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingX: "20px",
      }}
    >
      <Typography variant="h5">Hi Deva, Let's Play</Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          marginTop: "10px",
          gap: 1
        }}
      >
        {/* <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={isRunning || winModalOpen}
        >
          Start
        </Button> */}
        <TimerOutlinedIcon   />
        <Typography variant="h5" sx={{mr:1}}>
          {formatTime(secondsElapsed)}
        </Typography>
        <Typography
          variant="h5"
          
        >
          Turns: {turns}
        </Typography>
        {/* <Button onClick={onRestart} color="primary" variant="contained">
          Restart
        </Button> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Typography variant="h6">Level:</Typography>
        {Array.from({ length: currentLevel }).map((_, index) => (
          <StarIcon
            key={index}
            sx={{ color: "#Ffd700",  }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Header;
