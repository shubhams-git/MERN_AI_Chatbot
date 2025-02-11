import {
  Avatar,
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemo } from "react";

// Function to check if content is markdown
const isMarkdown = (text: string) => /^(\s*#+|(?:[*_-]{2,})|```)/m.test(text);

// Function to extract text and code blocks
function extractCode(message: string) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)^```/gm;
  const parts = [];
  let lastIndex = 0;

  message.replace(codeBlockRegex, (match, language, code, offset) => {
    if (offset > lastIndex) {
      parts.push({
        isCode: false,
        content: message.slice(lastIndex, offset),
        language: null,
      });
    }
    parts.push({
      isCode: true,
      content: code.trim(),
      language: language || "plaintext",
    });

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < message.length) {
    parts.push({
      isCode: false,
      content: message.slice(lastIndex),
      language: null,
    });
  }

  return parts;
}

// Custom Markdown renderer
const MarkdownRenderer = ({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {children}
        </Typography>
      ),
      h2: ({ children }) => (
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {children}
        </Typography>
      ),
      h3: ({ children }) => (
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {children}
        </Typography>
      ),
      p: ({ children }) => <Typography gutterBottom sx={{ my: 1.5 }}>{children}</Typography>,
      ul: ({ children }) => (
        <ul style={{ paddingLeft: 20, color: "whitesmoke" }}>{children}</ul>
      ),
      ol: ({ children }) => (
        <ol style={{ paddingLeft: 20, color: "whitesmoke" }}>{children}</ol>
      ),
      li: ({ children }) => <li style={{ color: "whitesmoke" }}>{children}</li>,
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
    }}
  >
    {content}
  </ReactMarkdown>
);

// Main ChatItem component
export const ChatItem = ({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) => {
  const auth = useAuth();
  const messageBlocks = useMemo(() => extractCode(content), [content]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userInitials = auth?.user?.name
    ? auth.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "U";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "flex-start",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
        gap: 1,
        width: "100%",
        my: isMobile?0:1,
        pr: role === "user" ? 1:0,
        pl: role === "assistant" ? 1:0,
      }}
    >
      {/* If Assistant, show avatar first */}
      {role === "assistant" && (
        <Avatar
          sx={{
            bgcolor: "#004d5612",
            color: "black",
            width: { xs: 32, sm: 48 },
            height: { xs: 32, sm: 48 },
          }}
        >
          <img
            src="/meta.svg"
            className="image-inverted"
            alt="openai"
            style={{ width: isMobile ? 20 : 30 }}
          />
        </Avatar>
      )}

      {/* User Avatar should be before the message on mobile and aligned right */}
      {role === "user" && isMobile && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <Avatar
            sx={{
              bgcolor: "black",
              color: "white",
              width: { xs: 32, sm: 48 },
              height: { xs: 32, sm: 48 },
            }}
          >
            {userInitials}
          </Avatar>
        </Box>
      )}

      {/* Message Box */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 1.5, sm: 2 },
          
          maxWidth: isMobile?( role === "user"?"90%":"95%" ):"80%",
          bgcolor: role === "user" ? "#004d56" : "transparent",
          color: role === "user" ? "white" : "black",
          borderRadius: 2,
          alignSelf: role === "user" && isMobile ? "flex-end" : "flex-start",
        }}
      >
        {messageBlocks.length === 1 && !messageBlocks[0].isCode ? (
          isMarkdown(content) ? (
            <MarkdownRenderer content={content} />
          ) : (
            <Typography sx={{ whiteSpace: "pre-line" }}>{content}</Typography>
          )
        ) : (
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <Box key={index} sx={{ overflowX: "auto" }}>
                <SyntaxHighlighter
                  style={coldarkDark}
                  language={block.language || "plaintext"}
                  wrapLongLines
                >
                  {block.content}
                </SyntaxHighlighter>
              </Box>
            ) : isMarkdown(block.content) ? (
              <MarkdownRenderer key={index} content={block.content} />
            ) : (
              <Typography key={index} sx={{ whiteSpace: "pre-line" }}>
                {block.content}
              </Typography>
            )
          )
        )}
      </Paper>

      {/* If User and not Mobile, show avatar after message */}
      {role === "user" && !isMobile && (
        <Avatar
          sx={{
            bgcolor: "black",
            color: "white",
            width: { xs: 32, sm: 48 },
            height: { xs: 32, sm: 48 },
          }}
        >
          {userInitials}
        </Avatar>
      )}
    </Box>


  );
};


export default ChatItem;