import { Avatar, Box, Button, IconButton, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext"
import { red } from "@mui/material/colors"
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteAllChats, getAllChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
    role: "user" | "assistant";
    content: string;
}

const Chat = () => {
    const auth = useAuth()
    const [messages, setMessages] = useState<Message[] | null>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useLayoutEffect(() => {
        if (auth?.signIn && auth.user) {
            const id = "loading-chats"; // Unique ID for this toast
            const loadingToast = toast.loading("Loading Chats...", { id });

            const fetchChats = async () => {
                try {
                    const data = await getAllChats();
                    setMessages(data.chats);
                    toast.success("Chats Loaded...", { id });
                } catch (error) {
                    console.error("Error fetching chats:", error);
                    toast.error("Failed to load chats.", { id });
                }
            };

            fetchChats();
    }
    }, []);

const handleSubmit = async () => {
    if (inputRef.current) {
        const message = inputRef.current.value;
        if (message.trim() !== "") {
            const response = await sendChatRequest(message);
            console.log(response)
            setMessages([...response.chats]);
            inputRef.current.value = "";
        }
    }
}

const handleClearConversation = async () => {
    toast.loading("Deleting the chats...", {id:"delete chat"});
    try {
        const response = await deleteAllChats();
        if (response === "OK") {
        setMessages([]);
        toast.success("Conversation cleared successfully.", {id:"delete chat"});
    }
    } catch (error) {
        console.error("Error deleting chats:", error);
        toast.error("Failed to clear the conversation.", {id:"delete chat"});        
    }
}

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
                    onClick={handleClearConversation}
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
                Model- Llama-3.1 (405B)
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
                {messages?.map((message, index) => (
                    <ChatItem role={message.role} content={message.content} key={index} />
                ))}
            </Box>
            <div style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: 8,
                padding: 20,
                borderColor: "white",
                paddingLeft: 10,
                backgroundColor: "rgb(17,29,39)",
                display: "flex",
                marginRight: "auto",
                margin: "auto",
                boxSizing: "border-box",
            }}>
                {" "}
                <input
                    ref={inputRef}
                    type="text"
                    style={{
                        flex: 1,
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
                    onClick={handleSubmit}
                    sx={{
                        color: "white",
                        ml: "auto"
                    }}>
                    <IoMdSend></IoMdSend>
                </IconButton>
            </div>
        </Box>
    </Box>
)
}

export default Chat