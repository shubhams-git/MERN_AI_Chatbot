import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import CustomizedInput from "../components/shared/CustomizedInput"
import { IoLogInOutline } from "react-icons/io5"
import React, { useEffect } from "react"
//@ts-ignore
import { AuthProvider, useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

const SignIn = () => {
  const nav = useNavigate()
  const auth = useAuth();
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString() as string;
    const password = data.get("password")?.toString() as string;
    try {
      toast.loading("Signing In...", { id: "signin" });
      await auth?.signIn(email, password);
      toast.dismiss();
      toast.success("Signed In Successfully");
      nav("/chat");
    } catch (err) {
      toast.dismiss();
      toast.error("Sign In Failed", { id: "failed" });
    }
  }
  useEffect(() => {
    if (auth?.isSignedIn && auth?.user) {
      nav("/chat");
    }
  }, [auth]);

  return (
    <>
      <Box width={"100%"} height={"100%"} display={"flex"} flex={1} >
        <Box padding={8} mt={8} ml={10} display={{ md: "flex", sm: "none", xs: "none" }}>
          <img src="airobot.png" alt="Robot" width={"350px"} />
        </Box>
        <Box padding={2} ml={"auto"} mt={12} display={"flex"} flex={{ xs: 1, md: 0.5 }} justifyContent={"center"} alignItems={"center"}>
          <form
            onSubmit={handleSubmit}
            style={{
              margin: "auto",
              padding: "20px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "none",
              width: "100%",
              maxWidth: isBelowMd?"auto":"400px",
            }}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Typography
                variant={"h4"}
                textAlign={"center"}
                padding={2}
                fontWeight={600}>
                Sign In</Typography>
              <CustomizedInput name={"email"} type={"email"} label={"Email"} />
              <CustomizedInput name={"password"} type={"password"} label={"Password"} />
              <Button
                type="submit"
                sx={{
                  justifyContent: "center",
                  px: 2,
                  py: 1,
                  mt: 2,
                  width: 'auto',
                  borderRadius: 2,
                  bgcolor: "#00fffc",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  }
                }}
                endIcon={<IoLogInOutline />}>
                Sign in
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}

export default SignIn