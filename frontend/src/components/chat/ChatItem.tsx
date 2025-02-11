import { Avatar, Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemo } from "react";

// Function to check if content is markdown or plain text
const isMarkdown = (text: string) => /^(\s*#+|[*_\-]{2,}|```)/m.test(text);

// Function to split content into text and code blocks
function extractCode(message: string) {
  const parts = message.split(/```(\w+)?\n?/g);
  return parts.map((block, index) => ({
    isCode: index % 2 === 1,
    content: block.trim(),
    language: index % 2 === 1 ? parts[index + 1] || "javascript" : null, // Extract language
  }));
}

// Custom Markdown renderer for consistent styling
const MarkdownRenderer = ({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h1: ({ children }) => (
        <Typography variant="h4" fontWeight="bold" gutterBottom fontSize={{ xs: "1.4rem", md: "2rem" }}>
          {children}
        </Typography>
      ),
      h2: ({ children }) => (
        <Typography variant="h5" fontWeight="bold" gutterBottom fontSize={{ xs: "1.2rem", md: "1.75rem" }}>
          {children}
        </Typography>
      ),
      h3: ({ children }) => (
        <Typography variant="h6" fontWeight="bold" gutterBottom fontSize={{ xs: "1.1rem", md: "1.5rem" }}>
          {children}
        </Typography>
      ),
      p: ({ children }) => (
        <Typography fontSize={{ xs: 14, sm: 16, md: 18 }} lineHeight="1.8" gutterBottom>
          {children}
        </Typography>
      ),
      li: ({ children }) => (
        <Typography component="li" fontSize={{ xs: 14, sm: 16, md: 18 }} lineHeight="1.8" gutterBottom>
          {children}
        </Typography>
      ),
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
        p: 2,
        my: 1,
        gap: 2,
        flexDirection: role === "user" ? "row-reverse" : "row",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: role === "user" ? "black" : "#004d5612",
          color: role === "user" ? "white" : "black",
          flexShrink: 0,
        }}
      >
        {role === "user" ? (
          userInitials
        ) : (
          <img
            src="/meta.svg"
            className="image-inverted"
            alt="openai"
            style={{ width: 30 }}
          />
        )}
      </Avatar>

      {/* Message Box */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: { xs: "90%", sm: "80%" },
          width: "100%",
          bgcolor: role === "user" ? "#004d56" : "transparent",
          color: role === "user" ? "white" : "black",
          borderRadius: 2,
          boxSizing: "border-box",
          overflow: "hidden",
          ml: role === "assistant" ? { xs: 0, sm: 1 } : "auto",
          mr: role === "user" ? { xs: 0, sm: 1 } : "auto",
        }}
      >
        {messageBlocks.length === 1 && !messageBlocks[0].isCode ? (
          isMarkdown(content) ? (
            <MarkdownRenderer content={content} />
          ) : (
            <Typography
              fontSize={{ xs: 14, sm: 16, md: 18 }}
              lineHeight="1.8"
              sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {content}
            </Typography>
          )
        ) : (
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <Box
                key={index}
                sx={{
                  maxWidth: "100%",
                  overflowX: "auto",
                  "& pre": {
                    maxWidth: "100%",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    margin: "0 !important",
                    padding: "1rem !important",
                  },
                }}
              >
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
              <Typography
                key={index}
                fontSize={18}
                lineHeight="1.8"
                sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
              >
                {block.content}
              </Typography>
            )
          )
        )}
      </Paper>
    </Box>
  );
};
