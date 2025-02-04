import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <Typography fontSize={20} lineHeight="1.6" gutterBottom>
          {children}
        </Typography>
      ),
      ul: ({ children }) => (
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          {children}
        </Box>
      ),
      li: ({ children }) => (
        <Typography component="li" fontSize={20} lineHeight="1.6" gutterBottom>
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

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: 0 }}>
        <img src="/openai.png" alt="openai" style={{ width: 30 }} />
      </Avatar>
      <Box>
        {messageBlocks.length === 1 && !messageBlocks[0].isCode ? (
          <MarkdownRenderer content={content} />
        ) : (
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
              >
                {block.content}
              </SyntaxHighlighter>
            ) : (
              <MarkdownRenderer key={index} content={block.content} />
            )
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        my: 0.5,
        bgcolor: "#004d56",
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={20}>{content}</Typography>
      </Box>
    </Box>
  );
};
