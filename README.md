# RizzBot – Your Ultimate AI Chatbot Playground!

[![GitHub stars](https://img.shields.io/github/stars/shubhams-git/MERN_AI_Chatbot?style=social)](https://github.com/shubhams-git/MERN_AI_Chatbot) 
[![GitHub forks](https://img.shields.io/github/forks/shubhams-git/MERN_AI_Chatbot?style=social)](https://github.com/shubhams-git/MERN_AI_Chatbot) 

## Description

RizzBot is a full‐stack AI chatbot platform that brings together multiple conversational AI models under one roof. In today’s rapidly evolving AI landscape—with breakthroughs ranging from DeepSeek’s R1 to Qwen 2.5 VL and beyond—RizzBot empowers you to experiment, compare, and interact with various AI chat models in real time without losing the context of your conversation.

Whether you're testing for accuracy, creativity, or a touch of humor, RizzBot delivers an engaging and seamless experience that stands out in the crowded world of AI chatbots.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Supported Models](#supported-models)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- **Real-Time Model Switching:** Seamlessly change between different AI models without losing your chat history.
- **Instant Comparison:** Evaluate and compare AI responses on the fly.
- **Persistent Conversations:** All user chats are stored securely, so you can return and continue any conversation at any time.
- **Engaging & Entertaining:** Enjoy witty, dynamic interactions that combine functionality with a fun user experience.

## Tech Stack

- **Frontend:** React.js with Material UI (MUI) and TypeScript, deployed on Vercel.
- **Backend:** Node.js with Express using the MERN stack, hosted on Render.
- **Database:** MongoDB with Mongoose ORM.
- **Security:** JWT authentication, HTTP-only cookies, and 10 rounds of hashing & salting for robust user protection.
- **Validation & Session Management:** Zod for schema validation and Context API for session continuity.
- **AI Integration:** Powered by GenAI & OpenRouter to connect with top-tier AI chatbot models.

## Supported Models

- Geminini Flash 2.0
- Geminini Flash Lite 2.0
- Qwen 2.5 VL
- DeepSeek R1
- Llama 3.1
- Geminini Pro 2.0
- Llama 3.3

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/shubhams-git/MERN_AI_Chatbot.git
cd MERN_AI_Chatbot

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

> **Note:** Ensure you have Node.js, npm, and MongoDB installed on your machine. For detailed environment setup instructions, please refer to the documentation in each folder.

## Usage

### Running Locally

1. **Start the Backend:**
   ```bash
   cd backend
   npm run build
   npm run dev
   ```
2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

Then open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to access RizzBot.

### Live Demo

Try out RizzBot online: [RizzBot Live Demo](https://rizz-bot-ai.vercel.app/)

## Future Enhancements

- Integration of additional AI models such as OpenAI's GPT 3-mini and Claude 3.5 Sonnet.
- Enhanced analytics for deeper conversation insights.
- Mobile application support for on-the-go access.

## Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository.
2. **Create** a new branch:  
   `git checkout -b feature/<YourFeature>`
3. **Commit** your changes:  
   `git commit -m 'Add new feature'`
4. **Push** to your branch:  
   `git push origin feature/<YourFeature>`
5. **Open** a Pull Request describing your changes.

For questions or issues, please open an issue in the repository. 

## Contact

For any inquiries or support, please reach out to:

- **Maintainer:** [Shubham Sharma](mailto:msg2shubh@gmail.com)
- **GitHub:** [shubhams-git](https://github.com/shubhams-git)

---

*RizzBot is built with passion for AI and a commitment to innovation. Enjoy exploring the future of chatbot technology!*
