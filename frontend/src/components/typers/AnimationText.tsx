import React from 'react';
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
          xs: '25px', // Extra-small screens
          sm: '35px', // Small screens
          md: '45px', // Medium screens and up
        },
      }}
    >
      <TypeAnimation
        sequence={[
          'Chat with AI, effortlessly.',
          1000,
          'Your thoughts, our AI. 🖳',
          1000,
          'Smooth conversations, smarter replies.',
          1500,
          'Powered by open-source, built for you.',
          2000,
        ]}
        speed={50}
        repeat={Infinity}
      />
    </Box>
  );
};

export default AnimationText;
