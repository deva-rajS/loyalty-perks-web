import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2"; // lightweight, customizable
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SignInImage from "../../assets/images/SignIn.png";
import { keys } from "../../common/utils";
import { AppDispatch, RootState } from "../../config/createStore";
import { useAppDispatch } from "../../config/hooks";
import {
  clearError,
  clearMessage,
  onUserSignUp,
} from "../../reducers/authReducer";
import { rootNames } from "../../common/constants";
import theme from "../../theme/theme";

type SignUpProps = {
  loginKey: string;
};

const SimpleLogin = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { loading, error, isLogin, message } = useSelector(
    (state: RootState) => state.auth
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert(`Signup failed: ${error}`);
      dispatch(clearError());
    }
  }, [error]);

  const handleResetFields = () => {
    setFirstName("");
    setPhoneNumber("");
    setLoginCode("");
    setPassword("");
  };

  const handleSignup = async () => {
    if (!firstName || !phoneNumber || !loginCode || !password) {
      alert("Please fill all required fields.");
      return;
    }

    if (password.length < 7) {
      alert("Password must be at least 7 characters long.");
      return;
    }

    let formattedPhone = phoneNumber.trim();
    if (formattedPhone.startsWith("91")) {
      formattedPhone = `+${formattedPhone}`;
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const userData = {
      firstName,
      lastName,
      phoneNumber: formattedPhone,
      loginCode,
      password,
    };

    const resultAction = await dispatch(onUserSignUp(userData));
    // if (onUserSignUp.fulfilled.match(resultAction)) {
    //   alert(message || "Account created successfully.");
    //   handleResetFields();
    //   dispatch(clearMessage());
    // }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "94vh",
        borderRadius: "20px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <img
          src={SignInImage}
          alt="Sign Up"
          style={{
            width: "100%",
            maxHeight: 300,
            objectFit: "contain",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mx: 1 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 1, color: theme.palette.primary.main }}>
          Good Food
        </Typography>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />

        {/* <Box mt={3}>
          <PhoneInput
            country={"in"}
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            inputStyle={{ width: "100%", fontSize: "16px" }}
            // inputProps={{
            //   onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            //     if (e.key === "Enter") focusPasswordInput();
            //   },
            // }}
          />
        </Box> */}

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/${rootNames.GAME_SCREEN}`, { replace: true })}
          disabled={loading}
          sx={{ mx: "auto", px: 4, py: 1.5, mt: 2}}
        >
          Play now
        </Button>

        {/* <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/")} variant="text">
            Sign in now
          </Button>
        </Typography> */}
      </Box>
    </Container>
  );
};

export default SimpleLogin;
