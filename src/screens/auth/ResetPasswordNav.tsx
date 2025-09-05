import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import colors from "../../common/colorConstants";
import { rootNames } from "../../common/constants";
import { keys } from "../../common/utils";
import ResetPassword from "./ResetPassword";

const ResetPasswordNav: React.FC<any> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event: any, newValue: number) => {
    const routeName =
      newValue === 0
        ? rootNames.RESET_PASSWORD_ADMIN
        : rootNames.RESET_PASSWORD_USER;

    navigate(`/${routeName}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs
        value={location.pathname === `/${rootNames.RESET_PASSWORD_ADMIN}` ? 0 : 1}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        aria-label="reset password tabs"
      >
        <Tab
          label="Admin"
          value={0}
          sx={{
            color: colors.appTheme,
            fontSize: "16px",
          }}
        />
        <Tab
          label="User"
          value={1}
          sx={{
            color: colors.appTheme,
            fontSize: "16px",
          }}
        />
      </Tabs>

      {/* Render the correct tab content */}
      {location.pathname === `/${rootNames.RESET_PASSWORD_ADMIN}` && (
        <ResetPassword loginKey={keys.adminLoginKey} />
      )}
      {location.pathname === `/${rootNames.RESET_PASSWORD_USER}` && (
        <ResetPassword loginKey={keys.userLoginKey} />
      )}
    </Box>
  );
};

export default ResetPasswordNav;
