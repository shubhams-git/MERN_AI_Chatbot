import { TypeAnimation } from 'react-type-animation';
import { Box } from '@mui/material';

const AnimationText = () => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        color: 'white',
        textShadow: '1px 1px 20px #000',
        fontSize: {
          xs: '20px', 
          sm: '30px', 
          md: '40px',
        },
      }}
    >
      <TypeAnimation
        sequence={[
          'Chat with AI, effortlessly.',
          1000,
          'Your thoughts, our AI.',
          1000,
          'Switch AI models in real-time.',
          1500,
          'Test. Compare. Chat smarter.',
          2500,
        ]}
        speed={50}
        repeat={Infinity}
      />
    </Box>
  );
};

export default AnimationText;
