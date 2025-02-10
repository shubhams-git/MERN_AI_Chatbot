import { Box, Typography, Link, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        color: "white",
        py: 3,
        mt: 5,
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.2)"
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
          © {new Date().getFullYear()} Shubham Sharma | Software Engineer
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          Passionate about building sustainable software technologies.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link
            href="https://www.linkedin.com/in/ss-shubham-sharma"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 1, color: "#0A66C2", textDecoration: "none", fontWeight: 500 }}
          >
            LinkedIn
          </Link>
          |
          <Link
            href="https://github.com/shubhams-git"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mx: 1, color: "#BB86FC", textDecoration: "none", fontWeight: 500 }}
          >
            GitHub
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
