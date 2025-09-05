import React from "react";
import { Box, Typography } from "@mui/material";
import ResetPasswordNav from "./ResetPasswordNav";
import colors from "../../common/colorConstants";

const ResetPasswordContainer: React.FC<any> = ({ route, navigation }) => {
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
          height: "180px",
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
          Reset new password
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
          Now you need to set a new password for your account.
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <ResetPasswordNav route={route} navigation={navigation} />
      </Box>
    </Box>
  );
};

export default ResetPasswordContainer;
