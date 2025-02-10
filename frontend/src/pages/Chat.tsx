import { Avatar, Box, Button, IconButton, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useAuth } from "../context/AuthContext"
import { red } from "@mui/material/colors"
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteAllChats, getAllChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LoadingResponse } from "../components/chat/LoadingResponse";

type Message = {
    role: "user" | "assistant";
    content: string;
}

type Model = {
    id: string;
    name: string;
    provider: string;
};

const MODELS: Model[] = [
    { id: 'gemini-flash-2', provider: 'Google', name: 'Gemini Flash 2.0' },
    { id: 'gemini-flash-lite', provider: 'Google', name: 'Gemini Flash Lite 2.0' },
    { id: 'qwen-2.5-vl', provider: 'Qwen', name: 'Qwen2.5 VL' },
    { id: 'deepseek-r1', provider: 'DeepSeek', name: 'DeepSeek R1' },
    { id: 'llama-3.1', provider: 'NVIDIA', name: 'Llama 3.1' },
    { id: 'gemini-pro-2', provider: 'Google', name: 'Gemini Pro 2.0' },
];

const Chat = () => {
    const auth = useAuth()
    const nav = useNavigate()
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputRows, setInputRows] = useState(1);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (auth?.isSignedIn && auth.user) {
            toast.loading("Loading Chats...", { id: "loading-chats" });

            const fetchChats = async () => {
                try {
                    const data = await getAllChats();
                    setMessages(data.chats);
                    toast.success("Chats Loaded...", { id: "loading-chats" });
                } catch (error) {
                    console.error("Error fetching chats:", error);
                    toast.error("Failed to load chats.", { id: "loading-chats" });
                }
            };

            fetchChats();
        }
    }, [auth]);

    const handleSubmit = async () => {
        const message = inputRef.current?.value?.trim();
        if (message) {
            try {
                setIsLoading(true);
                const response = await sendChatRequest(message, selectedModel.id);
                setMessages(response.chats);
                if (inputRef.current) inputRef.current.value = "";
                setInputRows(1);
            } catch (error) {
                console.error("Error sending message:", error);
                toast.error("Failed to send message.");
            } finally {
                setIsLoading(false);
            }
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const lineHeight = 24;
        const previousRows = e.target.rows;
        e.target.rows = 1; 

        const currentRows = Math.floor(e.target.scrollHeight / lineHeight);
        const maxRows = 6;

        if (currentRows === previousRows) {
            e.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            e.target.rows = maxRows;
            e.target.scrollTop = e.target.scrollHeight;
        } else {
            e.target.rows = currentRows;
        }

        setInputRows(currentRows < maxRows ? currentRows : maxRows);
    };

    const handleClearConversation = async () => {
        toast.loading("Deleting the chats...", { id: "delete chat" });
        try {
            const response = await deleteAllChats();
            if (response === "OK") {
                setMessages([]);
                toast.success("Conversation cleared successfully.", { id: "delete chat" });
            }
        } catch (error) {
            console.error("Error deleting chats:", error);
            toast.error("Failed to clear the conversation.", { id: "delete chat" });
        }
    }

    useEffect(() => {
        if (!auth?.isSignedIn || !auth?.user) {
            nav("/signin");
        }
    }, [auth]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo({
                top: messagesEndRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                width: '100%',
                height: '100%',
                mt: 3,
                gap: 3,
                overflow: 'hidden',
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
                        height: '60vh',
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
                        }}>
                        {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1]?.[0]}
                    </Avatar>
                    <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
                        You are talking to a ChatBOT
                    </Typography>
                    <Typography sx={{
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
                            ":hover": { bgcolor: red.A400 }
                        }}>
                        Clear Conversation
                    </Button>
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                flex: { md: 0.8, sm: 1, xs: 1 },
                flexDirection: 'column',
                padding: 3,
                minWidth: 0,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 2
                }}>
                    <FormControl sx={{ minWidth: 250 }} size="small">
                        <InputLabel sx={{ color: 'white' }}>Select Model</InputLabel>
                        <Select
                            value={selectedModel.id}
                            onChange={(e) => {
                                const model = MODELS.find(m => m.id === e.target.value);
                                if (model) setSelectedModel(model);
                            }}
                            label="Select Model"
                            sx={{
                                color: 'white',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255,255,255,0.5)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                backgroundColor: 'rgb(17,29,39)', 
                            }}
                        >
                            {MODELS.map((model) => (
                                <MenuItem
                                    key={model.id}
                                    value={model.id}
                                    sx={{
                                        color: 'white', 
                                        backgroundColor: 'rgb(17,29,39)', 
                                        '&:hover': {
                                            color: 'black', 
                                            backgroundColor: 'white', 
                                        },
                                        '&.Mui-selected': {
                                            color: 'black', 
                                            backgroundColor: 'white', 
                                            '&:hover': {
                                                color: 'white', 
                                                backgroundColor: 'rgb(17,29,39)', 
                                            },
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography color="inherit" variant="subtitle1">
                                            {model.provider}
                                        </Typography>
                                        <Typography variant="body2" sx={{ opacity: 0.8, color: 'inherit' }}>
                                            {model.name}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                </Box>

                <Box
                    ref={messagesEndRef}
                    sx={{
                        width: '100%',
                        height: '60vh',
                        borderRadius: 3,
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        scrollBehavior: 'smooth',
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        minWidth: 0,
                    }}>
                    {messages.map((message, index) => (
                        <ChatItem role={message.role} content={message.content} key={index} />
                    ))}
                    {isLoading && <LoadingResponse />}
                </Box>

                <Box sx={{
                    width: "100%",
                    maxWidth: "100%",
                    borderRadius: 8,
                    p: 2,
                    borderColor: "white",
                    backgroundColor: "rgb(17,29,39)",
                    display: "flex",
                    margin: "auto",
                    boxSizing: "border-box",
                    alignItems: 'center',
                }}>
                    <TextField
                        inputRef={inputRef}
                        multiline
                        maxRows={6}
                        minRows={1}
                        onKeyDown={handleKeyPress}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        fullWidth
                        sx={{
                            '& .MuiInputBase-root': {
                                color: 'white',
                                fontSize: '1.25rem',
                                lineHeight: 1.2,
                                padding: '8px 12px',
                                overflowY: 'auto',
                                '& textarea': {
                                    resize: 'vertical',
                                    minHeight: '24px',
                                    maxHeight: '144px',
                                },
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(255,255,255,0.4)',
                                    borderRadius: '3px',
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        }}
                    />
                    <IconButton
                        onClick={handleSubmit}
                        disabled={isLoading}
                        sx={{
                            color: "white",
                            ml: 1,
                            alignSelf: 'flex-end',
                            mb: 0.5
                        }}>
                        <IoMdSend />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default Chat