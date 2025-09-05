import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

function WinModal({ turns, onRestart, currentLevel }: any) {
  return (
    <Modal open={true} onClose={onRestart} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '10px', backgroundColor: "white",  borderRadius: "10px", padding: "20px", gap: "10px"}}>
       <Typography variant="h5"  sx={{ fontWeight: "600" }}>🎉 You Won!</Typography>
       <Typography variant="subtitle1" sx={{ fontSize: 16, fontWeight: "500" }}>Total Turns: {turns}</Typography>
        <Button onClick={onRestart} color="primary" variant="contained">
          {currentLevel === 3 ? "Leaderboard" : "Next Level"}
        </Button>
    </Box>
    </Modal>
  );
}

export default WinModal;
