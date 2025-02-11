import { Box, useMediaQuery, useTheme } from "@mui/material";
import AnimationText from "../components/typers/AnimationText";
import Footer from "../components/footer/Footer";
import MobileGuide from "../components/typers/MobileGuide";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
          flexGrow: 1,
        }}
      >
        <Box>
          <AnimationText />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: isBelowMd ? "column" : "row",
            gap: 5,
            my: 2,
          }}
        >
          {!isBelowMd && (
            <img
              src="robot.png"
              alt="Robot"
              style={{ width: "120px", margin: "auto" }}
            />
          )}
          <img
            className="rotate"
            src="meta.svg"
            alt="openai"
            style={{
              width: isBelowMd ? "80px" : "120px",
              margin: "auto",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            mx: "auto",
          }}
        >
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: "20px",
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
        </Box>
        {isBelowMd && (
          <Box sx={{
            width: '100%',
            mt: 'auto', // Pushes component to bottom
            py: 2,
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.2))'
          }}>
            <MobileGuide />
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
