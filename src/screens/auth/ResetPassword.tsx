import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import colors from "../../common/colorConstants";
import { keys } from "../../common/utils";
// import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert";
import PasswordInput from "../../components/PasswordInput";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import {
    clearMessage,
    onPasswordReset
} from "../../reducers/authReducer";

interface ResetPasswordProps {
  loginKey: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ loginKey }) => {
  const navigate = useNavigate();

  const { loading, error, message } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginCode, setLoginCode] = useState("");

  const [open, setOpen] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (error) {
      //   Alert.alert("Password Reset Failed", error, [
      //     { text: "OK", onPress: () => dispatch(clearError()) },
      //   ]);
      showAlert("Password Reset Failed", error);
    }
    if (message) {
      // Alert.alert(messageTitle, message, [
      //     { text: "OK", onPress: () => dispatch(clearMessage()) },
      // ]);
      showAlert(messageTitle, message);
    }
  }, [error, dispatch]);

  const handleAlertClose = () => setOpen(false);

  const handleAlertConfirm = () => {
    setOpen(false);
    // Your navigation logic here (e.g., navigate to SignIn)
    // Example: navigate(rootNames.SIGN_IN);
    dispatch(clearMessage());
  };

  const showAlert = (title: string, message: any) => {
    setMessageTitle(title);
    setCurrentMessage(message);
    setOpen(true);
  };

  const handleResetPassword = async () => {
    if (!password || !phoneNumber || !loginCode) {
      alert("Please fill all required fields.");
      return;
    }

    if (password.length < 7) {
      alert("Password must be at least 7 characters long.");
      return;
    }

    let formattedPhoneNumber = phoneNumber.trim();
    if (formattedPhoneNumber.startsWith("91")) {
      formattedPhoneNumber = `+${formattedPhoneNumber}`;
    } else if (!formattedPhoneNumber.startsWith("+")) {
      formattedPhoneNumber = `+91${formattedPhoneNumber}`;
    }

    let userData;

    if (loginKey === keys.adminLoginKey) {
      userData = {
        password,
        phoneNumber: formattedPhoneNumber,
        companyAdminLoginCode: loginCode,
      };
    } else {
      userData = {
        password,
        phoneNumber: formattedPhoneNumber,
        companyUserLoginCode: loginCode,
      };
    }

    const resultAction = await dispatch(onPasswordReset(userData));
    if (onPasswordReset.fulfilled.match(resultAction)) {
      //   Alert.alert(
      //     "Password Reset Successful",
      //     message || "Password reset successfully.",
      //     [
      //       {
      //         text: "OK",
      //         onPress: () => {
      //           navigate(rootNames.SING_IN);
      //           dispatch(clearMessage());
      //         },
      //       },
      //     ]
      //   );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        Reset Your Password
      </Typography>

      <PhoneInput
        country={"in"}
        value={phoneNumber}
        onChange={(phone) => setPhoneNumber(phone)}
        inputStyle={{ width: "100%", fontSize: "16px" }}
      />

      <TextField
        label={
          loginKey === keys.adminLoginKey
            ? "Enter admin code"
            : "Enter user code"
        }
        variant="outlined"
        fullWidth
        value={loginCode}
        onChange={(e) => setLoginCode(e.target.value)}
        sx={{ marginBottom: "20px", maxWidth: "400px" }}
      />

      <PasswordInput
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        placeholder="Enter your new password"
        sx={{ marginBottom: "20px", maxWidth: "400px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetPassword}
        disabled={loading}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px",
          backgroundColor: colors.appTheme,
          color: "white",
          borderRadius: "8px",
        }}
      >
        {loading ? "Resetting" : "Reset Password"}
      </Button>

      <CustomAlert
        title={messageTitle}
        message={message}
        open={open}
        onClose={handleAlertClose}
        onConfirm={handleAlertConfirm}
      />
    </Box>
  );
};

export default ResetPassword;
