import { Avatar, Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Function to check if content is markdown or plain text
const isMarkdown = (text: string) => /[#*_`\-]/.test(text);

// Function to split content into text and code blocks
function extractCode(message: string) {
  const parts = message.split(/```/g);
  return parts.map((block, index) => ({
    isCode: index % 2 === 1,
    content: block.trim(),
  }));
}

// Custom Markdown renderer for consistent styling
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
      p: ({ children }) => (
        <Typography fontSize={18} lineHeight="1.8" gutterBottom>
          {children}
        </Typography>
      ),
      ul: ({ children }) => (
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          {children}
        </Box>
      ),
      li: ({ children }) => (
        <Typography component="li" fontSize={18} lineHeight="1.8" gutterBottom>
          {children}
        </Typography>
      ),
      code: ({ children }) => (
        <Typography
          component="code"
          sx={{
            fontSize: "0.9rem",
            backgroundColor: "#1e1e1e",
            borderRadius: "4px",
            padding: "2px 4px",
            fontFamily: "monospace",
          }}
        >
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
  const messageBlocks = extractCode(content);
  const userInitials = auth?.user?.name
    ? `${auth.user.name[0]}${auth.user.name.split(" ")[1]?.[0] || ""}`
    : "U";

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        my: 1,
        gap: 2,
        flexDirection: role === "user" ? "row-reverse" : "row",
      }}
    >
      {/* Avatar */}
      <Avatar
        sx={{
          bgcolor: role === "user" ? "black" : "#004d5612",
          color: role === "user" ? "white" : "black",
        }}
      >
        {role === "user" ? userInitials : <img src="/meta.svg" className="image-inverted" alt="openai" style={{ width: 30 }} />}
      </Avatar>

      {/* Message Box */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: "80%",
          bgcolor:  "#004d56", 
          color: role === "user" ? "white" : "black",
          borderRadius: 2,
        }}
      >
        {/* If message contains markdown, render MarkdownRenderer, otherwise improve readability */}
        {messageBlocks.length === 1 && !messageBlocks[0].isCode ? (
          isMarkdown(content) ? (
            <MarkdownRenderer content={content} />
          ) : (
            <Typography
              fontSize={18}
              lineHeight="1.8"
              sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {content}
            </Typography>
          )
        ) : (
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter key={index} style={coldarkDark} language="javascript">
                {block.content}
              </SyntaxHighlighter>
            ) : (
              isMarkdown(block.content) ? (
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
          )
        )}
      </Paper>
    </Box>
  );
};
