import { useNavigate } from "react-router";

import { Box, Button, Container, Typography } from "@mui/material";

import SignInImage from "../../assets/images/SignIn.png";
import { rootNames } from "../../common/constants";
import theme from "../../theme/theme";

const ThanksScreen = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "94vh",
        borderRadius: "20px",
        flexDirection: "column",
        justifyContent: "space-between",
        // gap: 10,
      }}
    >
      <Box
        sx={{
          flex: 0.7,
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={SignInImage}
            alt="Sign Up"
            style={{
              width: "100%",
              maxHeight: 800,
              objectFit: "contain",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: "hidden",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 1, color: theme.palette.primary.main }}
        >
          Thank You
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 0.3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          // onClick={() =>
          //   navigate(`/${rootNames.SIMPLE_LOGIN}`, { replace: true })
          // }
          sx={{ mx: "auto", px: 4, py: 1.5, mt: 2 }}
        >
          Learn more
        </Button>
        <Button
          variant="outlined"
          color="primary"
          // onClick={() =>
          //   navigate(`/${rootNames.SIMPLE_LOGIN}`, { replace: true })
          // }
          sx={{ mx: "auto", px: 4, py: 1.5, mt: 2, borderWidth: 2 }}
        >
          Pick your plan
        </Button>
      </Box>
    </Container>
  );
};

export default ThanksScreen;
