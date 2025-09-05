import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { rootNames } from "../common/constants";
import { useNavigate } from "react-router";

// Dummy leaderboard data
const leaderboardData = [
  { id: "1", name: "Alice", turns: 24, time: "1:10" },
  { id: "2", name: "Bob", turns: 28, time: "1:20" },
  { id: "3", name: "Charlie", turns: 30, time: "1:30" },
  { id: "4", name: "David", turns: 35, time: "1:50" },
  { id: "5", name: "Eva", turns: 40, time: "2:00" },
  { id: "6", name: "Frank", turns: 42, time: "2:10" },
  { id: "7", name: "Grace", turns: 48, time: "2:30" },
  { id: "8", name: "Charlie", turns: 52, time: "2:35" },
  { id: "9", name: "David", turns: 55, time: "2:40" },
  { id: "10", name: "Eva", turns: 60, time: "2:50" },
  { id: "11", name: "Frank", turns: 63, time: "2:55" },
  { id: "12", name: "Grace", turns: 68, time: "3:00" },
];

const LeaderBoard = () => {
  const navigate = useNavigate();
  const currentUserId = "4";

  const currentUser = leaderboardData.find((p) => p.id === currentUserId);

  const reorderedData = currentUser
    ? [currentUser, ...leaderboardData.filter((p) => p.id !== currentUserId)]
    : leaderboardData;

  const actualRank = (player: any) =>
    leaderboardData.findIndex((p) => p.id === player.id) + 1;

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2, fontWeight: "bold", color: "#444" }}
      >
        <EmojiEventsIcon color="warning" sx={{ mr: 1 }} />
        Leaderboard
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxHeight: "75vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          width: "100%",
        }}
      >
        <List sx={{ p: 0 }}>
          {reorderedData.map((player, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  bgcolor: index === 0 ? "#dae3f0" : "transparent",
                  // borderRadius: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#3f51b5" }}>
                    {player.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">{player.name}</Typography>
                  }
                  secondary={`Turns: ${player.turns}  Time: ${player.time}`}
                />
                {index < 4 && (
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {/* #{index + 1} */}#{actualRank(player)}
                  </Typography>
                )}
              </ListItem>
              {index !== leaderboardData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Button
        onClick={() => navigate(`/${rootNames.THANKS_SCREEN}`)}
        title="Leaderboard"
        variant="contained"
        sx={{
          borderRadius: "5px",
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          fontFamily: "Fredoka, sans-serif",
          fontSize: "14px",
          textTransform: "none",
          marginTop: 2,
        }}
      >
        Proceed ahead
      </Button>
    </Box>
  );
};

export default LeaderBoard;
