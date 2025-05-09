import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";

import SignUp from "./SignUp";
import { keys } from "../../common/utils";
import { rootNames } from "../../common/constants";

const SignUpNav = () => {
  const [value, setValue] = useState(0); // 0 = Admin, 1 = User

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Admin" />
        <Tab label="User" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <SignUp loginKey={keys.adminLoginKey} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp loginKey={keys.userLoginKey} />
      </TabPanel>
    </Paper>
  );
};

export default SignUpNav;

// Utility TabPanel Component
const TabPanel: React.FC<any> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} role="tabpanel" style={{ padding: 16 }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
