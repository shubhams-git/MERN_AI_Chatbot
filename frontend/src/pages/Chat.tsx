import { Avatar, Box, Button, IconButton, Typography, TextField, Select, MenuItem, FormControl, InputLabel, useMediaQuery, useTheme } from "@mui/material";
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
    { id: 'gemini-2.0-flash', provider: 'Google', name: 'Gemini Flash 2.0 (Recommended)' },
    { id: 'gemini-2.0-flash-lite-preview-02-05', provider: 'Google', name: 'Gemini Flash Lite 2.0 (Recommended)' },
    { id: 'qwen/qwen2.5-vl-72b-instruct:free', provider: 'Qwen', name: 'Qwen2.5 VL' },
    { id: 'deepseek/deepseek-r1:free', provider: 'DeepSeek', name: 'DeepSeek R1 (Slow)' },
    { id: 'nvidia/llama-3.1-nemotron-70b-instruct:free', provider: 'NVIDIA', name: 'Llama 3.1' },
    { id: 'google/gemini-2.0-pro-exp-02-05:free', provider: 'Google', name: 'Gemini Pro 2.0' },
    { id: 'meta-llama/llama-3.3-70b-instruct:free', provider: 'Meta', name: 'Llama 3.3' },
];


const Chat = () => {
    const auth = useAuth()
    const nav = useNavigate()
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
    const [isLoading, setIsLoading] = useState(false);
    //@ts-ignore
    const [inputRows, setInputRows] = useState(1);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));



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
                mt: 0,
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: { md: 'flex', sm: 'none', xs: 'none' },
                    flex: 0.2,
                    flexDirection: 'column',
                    marginLeft: 3,
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: 'auto',
                        bgcolor: 'rgb(17,29,39)',
                        borderRadius: 5,
                        flexDirection: 'column',
                        alignItems: 'center',
                        mx: 'auto',
                        my: 'auto',
                        px: 1,
                        py: 2
                    }}>
                    <Avatar
                        sx={{
                            mx: 'auto',
                            my: 2,
                            bgcolor: "white",
                            color: 'black',
                            fontWeight: 700,
                            width: 56,
                            height: 56,
                            fontSize: '1.25rem',
                        }}>
                        {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1]?.[0]}
                    </Avatar>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: "'Work Sans', sans-serif",
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: '#fff',
                                mb: 1,
                                textTransform: 'uppercase',
                            }}>
                            Welcome to RizzBot!
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontFamily: "'Work Sans', sans-serif",
                                fontWeight: 500,
                                color: red[200],
                                letterSpacing: 0.5,
                            }}>
                            Ready to get Rizzed?
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: "'Work Sans', sans-serif",
                            fontSize: '0.9rem',
                            textAlign: 'center',
                            py: 1,
                            px: 2,
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.9)',
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderRadius: 2,
                            mx: 'auto',
                            mb: 3,
                            maxWidth: '90%',
                            overflowWrap: 'break-word',
                        }}>
                        Hey there! I'm your go-to chatbot, here to help with info, humor, and good vibes.<br /><br />
                        Need help decoding tricky scientific concepts? Got a coding question? <br />
                        Or maybe you just feel like <br />
                        <em>chatting about life’s big (or small) mysteries?</em> Whatever it is, I’ve got your back.<br /><br />
                        Ask away and let’s vibe!
                    </Typography>
                    <Button
                        onClick={handleClearConversation}
                        sx={{
                            width: 'fit-content',
                            px: 3,
                            my: 'auto',
                            mx: 'auto',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: 3,
                            bgcolor: red[400],
                            ":hover": { bgcolor: red.A400 },
                            textAlign: 'center',
                        }}>
                        Clear Conversation
                    </Button>
                </Box>

            </Box>

            <Box sx={{
                display: "flex",
                flex: { md: 0.8, sm: 1, xs: 1 },
                flexDirection: 'column',
                padding: isBelowMd? 1: 3,
                paddingTop: 1,
                minWidth: 0,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mb: isBelowMd? 2:6,
                }}>
                    <FormControl sx={{ minWidth: 250 }} size="small">
                        <InputLabel sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}>Select Model</InputLabel>
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
                                '& .MuiMenu-paper': {
                                    marginTop: '8px', // Adjust this value to reduce the gap
                                    marginBottom: '8px', // Adjust this value to reduce the gap
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: 'rgb(17,29,39)',
                                        marginTop: '4px', // Adjust this value to reduce the gap
                                        marginBottom: '4px', // Adjust this value to reduce the gap
                                        '& .MuiMenuItem-root': {
                                            paddingTop: '8px', // Adjust padding to reduce space
                                            paddingBottom: '8px', // Adjust padding to reduce space
                                        },
                                    },
                                },
                            }}
                        >
                            {MODELS.map((model) => (
                                <MenuItem
                                    key={model.id}
                                    value={model.id}
                                    sx={{
                                        color: model.id === selectedModel.id ? 'black' : 'white',
                                        backgroundColor: model.id === selectedModel.id ? 'white' : 'rgb(17,29,39)',
                                        '&:hover': {
                                            color: model.id === selectedModel.id ? 'black' : 'black',
                                            backgroundColor: model.id === selectedModel.id ? 'white' : 'white',
                                        },
                                        '&.Mui-selected': {
                                            color: 'black',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                color: 'black',
                                                backgroundColor: 'white',
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
                        flexGrow: 1,
                        width: '100%',
                        height: isBelowMd? '70vh': '60vh',
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
                        px: 0,
                        py: { xs: 0.5, sm: 1 },
                        gap: { xs: 0.5, sm: 1 },
                        my:2
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
                    p: isBelowMd?1:2,
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
                                fontSize: isBelowMd ? '0.8rem' : '1.1rem',
                                lineHeight: 1.2,
                                padding: isBelowMd ? '3px 5px' : '6px 10px',
                                overflowY: 'auto',
                                '& textarea': {
                                    resize: 'vertical',
                                    minHeight: '20px',
                                    maxHeight: '120px',
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