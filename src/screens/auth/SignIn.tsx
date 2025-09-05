import "react-phone-input-2/lib/material.css";
import "../../App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import { AppDispatch, RootState } from "../../config/createStore";
import {
  clearError,
  clearMessage,
  onUserLogin,
} from "../../reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import SingInImage from "../../assets/images/GreyBack.jpg";
import PasswordInput from "../../components/PasswordInput";
import CustomButton from "../../components/CustomButton";
import theme from "../../theme/theme";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, isLogin, message } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch: AppDispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (error) {
      alert(`Sign-In Failed: ${error}`);
      dispatch(clearError());
    }
  }, [error]);

  const handleSignup = async () => {
    if (!phoneNumber || !password) {
      alert("Sign-In Failed: Please fill all required fields.");
      return;
    }

    if (password.length < 7) {
      alert("Weak Password: Password must be at least 7 characters.");
      return;
    }

    let formattedPhone = phoneNumber.trim();
    if (formattedPhone.startsWith("91")) {
      formattedPhone = `+${formattedPhone}`;
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    }

    const userData = { phoneNumber: formattedPhone, password };
    const result = await dispatch(onUserLogin(userData));

    if (onUserLogin.fulfilled.match(result)) {
      alert(message || "Signed in successfully.");
      dispatch(clearMessage());
    }
  };

  const focusPasswordInput = useCallback(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  return (
    <Container
      sx={{
        paddingLeft: { xs: 0, sm: 0 },
        paddingRight: { xs: 0, sm: 0 },
      }}
    >
      <Box
        sx={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          overflow: "hidden",
          "@media (max-width:500px)": {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
      >
        <Box
          component="img"
          src={SingInImage}
          alt="SignIn"
          sx={{
            width: "100%",
            maxHeight: 300,
            objectFit: "cover",
            display: "block",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            "@media (max-width:500px)": {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          }}
        />
      </Box>

      <Box
        textAlign="center"
        mt={3}
        sx={{
          mx: 2.5,
        }}
      >
        {/* <Typography variant="h3" fontWeight="bold">
          <span style={{ color: "#1A73E8" }}>L</span>oyalty
          <span style={{ color: "#1A73E8" }}>.</span>
          <span style={{ color: "#1A73E8" }}>P</span>erks
        </Typography> */}

        <Typography variant="h4">
          Log in
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.text.secondary, marginBottom: "20px" }}
        >
          Enter your details to continue
        </Typography>

        <Box mt={1}>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, textAlign: "left", marginBottom: "5px", fontWeight: 'medium' }}>
          Phone
        </Typography>
          <PhoneInput
            country={"in"}
            onlyCountries={["in"]}
            disableDropdown
            value={phoneNumber}
            placeholder="91 1234567890"
            onChange={(phone) => setPhoneNumber(phone)}
            inputStyle={{
              width: "100%",
              fontSize: "16px",
              height: "45px",
              outline: "none",
              boxShadow: "none",
              border: "none", 
            }}
            containerStyle={{
              border: `2px solid ${
                isFocused ? theme.palette.primary.main : "lightgrey"
              }`,
              borderRadius: "7px",
            }}
            inputProps={{
              onFocus: () => setIsFocused(true),
              onBlur: () => setIsFocused(false),
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") focusPasswordInput();
              },
            }}
            buttonStyle={{
              backgroundColor: "white",
              border: "none",
              margin: 1,
            }}
          />
        </Box>

        <Box mt={2} mb={2}>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, textAlign: "left", marginBottom: "5px", fontWeight: 'medium' }}>
          Password
        </Typography>
          <PasswordInput
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%" mb={1}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ textWrap: "nowrap"}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRememberMe}
                  onChange={(e) => setIsRememberMe(e.target.checked)}
                  sx={{ paddingRight: "5px" }}
                />
              }
              label="Remember me"
            />
          </Box>
          <Button
            color="primary"
            sx={{ textTransform: "none" , textWrap: "nowrap"}}
            onClick={() => navigate("/resetpassword")}
          >
            Recover password
          </Button>
        </Box>
        <CustomButton
          title={loading ? "Loging in..." : "Log in"}
          onClick={handleSignup}
        />

        <Button
          sx={{
            mt: 2,
            textTransform: "none",
            color: (theme) => theme.palette.text.primary,
          }}
          onClick={() => navigate("/signup")}
        >
          Don’t have an account?
          <Typography
            component="span"
            color="primary"
            sx={{ fontWeight: "light", paddingLeft: "5px" }}
          >
            Sign up now
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
