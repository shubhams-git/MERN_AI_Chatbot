import { Box, useMediaQuery, useTheme } from "@mui/material";
import AnimationText from "../components/typers/AnimationText";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
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
            flexDirection: { md: "row", xs: "column", sm: "column" },
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
            style={{ width: "120px", margin: "auto" }}
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
      </Box>
    </Box>
  );
};

export default Home;