import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { red } from "@mui/material/colors"
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";

const staticChats = [
  { role: "user", content: "Hello, how are you?" },
  { role: "assistant", content: "I'm doing great, thanks for asking! How can I help you today?" },
  { role: "user", content: "Can you tell me a joke?" },
  { role: "assistant", content: "Sure! Why don't skeletons fight each other? They don't have the guts!" },
  { role: "user", content: "What’s the weather like today?" },
  { role: "assistant", content: "I’m not sure about the exact weather, but I can help you look it up if you like!" },
  { role: "user", content: "What’s the capital of France?" },
  { role: "assistant", content: "The capital of France is Paris!" },
  { role: "user", content: "Tell me an interesting fact." },
  { role: "assistant", content: "Did you know honey never spoils? Archaeologists have found pots of honey in ancient tombs that are over 3,000 years old and still edible!" },
  { role: "user", content: "What’s the meaning of life?" },
  { role: "assistant", content: "That’s a big question! Some say it’s about finding happiness, others say it’s about seeking knowledge. What do *you* think?" },
  { role: "user", content: "Thanks for the help!" },
  { role: "assistant", content: "You're welcome! I'm always here if you need anything else." }
];


const Chat = () => {
  const auth = useAuth()
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', sm: 'none', xs: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '70vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}>
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: "white",
              color: 'black',
              fontWeight: 700
            }}>{auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'work sans',
            }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'work sans',
              textAlign: 'center',
              my: 4,
              p: 3
            }}>
            Hey there! I’m your friendly chatbot, here to help, chat, and maybe even crack a joke or two. <br />
            Ask me anything—news, weather, random trivia… or just how my day’s going (spoiler: it’s always great!).
          </Typography>
          <Button
            sx={{
              width: 200,
              my: 'auto',
              mx: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              bgcolor: red[400],
              ":hover": {
                bgcolor: red.A400,

              }
            }}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sm: 1, xs: 1 },
          flexDirection: 'column',
          padding: 3
        }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: 30,
            color: 'white',
            mx: 'auto',
            mb: 2,
            fontWeight: 600,
          }}>
          Model- Gemini-2.0 Flash Thinking
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
          }}>
          {staticChats.map((chat) => <ChatItem role={chat.role as "user" | "assistant"} content={chat.content} />)}
        </Box>
        <div style={{
          width: "100%",
          maxWidth:"100%",
          borderRadius: 8,
          padding:20,
          borderColor:"white",
          paddingLeft:10,
          backgroundColor: "rgb(17,29,39)",
          display: "flex",
          marginRight: "auto",
          margin: "auto",
          boxSizing: "border-box",
        }}>
          {" "}
          <input type="text"
            style={{
              flex:1,
              width: "100%",
              backgroundColor: "transparent",
              padding: 10,
              border: "none",
              outline: "none",
              color: "white",
              fontSize: 20
            }}
            placeholder="Type a message..." 
            />
          <IconButton
          sx={{
            color: "white",
            ml:"auto"
          }}>
            <IoMdSend></IoMdSend>
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat