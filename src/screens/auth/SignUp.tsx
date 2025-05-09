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

type SignUpProps = {
  loginKey: string;
};

const SignUp: React.FC<SignUpProps> = ({ loginKey }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { loading, error, isLogin, message } = useSelector(
    (state: RootState) => state.auth
  );

  const [fullName, setFullName] = useState("");
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
    setFullName("");
    setPhoneNumber("");
    setLoginCode("");
    setPassword("");
  };

  const handleSignup = async () => {
    if (!fullName || !phoneNumber || !loginCode || !password) {
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

    const userData =
      loginKey === keys.adminLoginKey
        ? {
            fullName,
            phoneNumber: formattedPhone,
            companyAdminLoginCode: loginCode,
            password,
          }
        : {
            fullName,
            phoneNumber: formattedPhone,
            companyUserLoginCode: loginCode,
            password,
          };

    const resultAction = await dispatch(onUserSignUp(userData));
    if (onUserSignUp.fulfilled.match(resultAction)) {
      alert(message || "Account created successfully.");
      handleResetFields();
      dispatch(clearMessage());
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", my: 4 }}>
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />

        <Box mt={3}>
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
        </Box>

        <TextField
          label={loginKey === keys.adminLoginKey ? "Admin Code" : "User Code"}
          value={loginCode}
          onChange={(e) => setLoginCode(e.target.value)}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/")} variant="text">
            Sign in now
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
