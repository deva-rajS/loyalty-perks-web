import React from "react";
import { Box, Typography } from "@mui/material";
import SignUpNav from "./SignUpNav";
import colors from "../../common/colorConstants";

const SignUpContainer = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "150px",
          margin: "40px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Fredoka-Regular",
            color: colors.darkBlue,
            fontSize: "38px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <Box
            component="span"
            sx={{ color: colors.appTheme, fontFamily: "Fredoka-Medium" }}
          >
            L
          </Box>
          oyalty
          <Box
            component="span"
            sx={{ color: colors.appTheme, fontFamily: "Fredoka-Medium" }}
          >
            .
          </Box>
          <Box
            component="span"
            sx={{ color: colors.appTheme, fontFamily: "Fredoka-Medium" }}
          >
            P
          </Box>
          erks
        </Typography>

        <Typography
          sx={{
            fontSize: "28px",
            fontFamily: "Fredoka-Regular",
            textAlign: "center",
          }}
        >
          Welcome
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            width: "85%",
            maxWidth: "500px",
            textAlign: "center",
            fontFamily: "Fredoka-Regular",
          }}
        >
          Sign up now.
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <SignUpNav />
      </Box>
    </Box>
  );
};

export default SignUpContainer;
