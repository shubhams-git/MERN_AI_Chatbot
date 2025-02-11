import { Box, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router";

const MobileGuide = () => {
    return (
        <Box
            sx={{
                width: '90%',
                maxWidth: '400px',
                mx: 'auto',
                p: 2,
                backgroundColor: 'auto',
                borderRadius: '16px',
                textAlign: 'center',
                mb: 2,
            }}
        >
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                Get Started in 3 Steps
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Step 1 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                    }}>
                        1
                    </Box>
                    <Typography variant="body1" sx={{ color: 'white', flexGrow: 1, textAlign: 'left' }}>
                        Create Account
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/signup"
                        variant="contained"
                        size="small"
                        sx={{
                            color: "black",
                            bgcolor: '#00fffc',
                            '&:hover': { bgcolor: 'primary.main' },
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 2,
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>

                {/* Step 2 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                    }}>
                        2
                    </Box>
                    <Typography variant="body1" sx={{ color: 'white', flexGrow: 1, textAlign: 'left' }}>
                        Login with Credentials
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/signin"
                        variant="contained"
                        size="small"
                        sx={{
                            color: "black",
                            bgcolor: '#00fffc',
                            '&:hover': { bgcolor: 'secondary.dark' },
                            textTransform: 'none',
                            borderRadius: '8px',
                            px: 2,
                        }}
                    >
                        Sign In
                    </Button>
                </Box>

                {/* Step 3 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                    }}>
                        3
                    </Box>
                    <Typography variant="body1" sx={{ color: 'white', flexGrow: 1, textAlign: 'left' }}>
                        Start Chatting & Enjoy!
                    </Typography>
                    <Box sx={{
                        width: 80,
                        height: 32,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "black",
                        bgcolor: '#00fffc',
                        fontSize: '0.875rem',
                    }}>
                        🎉 Done!
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MobileGuide;