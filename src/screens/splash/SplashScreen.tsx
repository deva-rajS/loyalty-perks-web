import { useNavigate } from 'react-router';

import { Box, Button, Container } from '@mui/material';

import SignInImage from '../../assets/images/SignIn.png';
import { rootNames } from '../../common/constants';

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "94vh",
        borderRadius: "20px",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
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

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/${rootNames.SIMPLE_LOGIN}`, { replace: true })}
          sx={{ mx: "auto", px: 4, py: 1.5, mt: 2}}
        >
          Start
        </Button>
    </Container>
  );
};

export default SplashScreen;
