import { Box, Typography } from "@mui/material"
import CustomizedInput from "../components/shared/CustomizedInput"

const SignIn = () => {
  return (
    <>
      <Box width={"100%"} height={"100%"} display={"flex"} flex={1} >
        <Box padding={8} mt={8} display={{md:"flex", sm:"none", xs: "none"}}>
          <img src="airobot.png" alt="Robot" width={"300px"} />
        </Box>
        <Box padding={2} ml={"auto"} mt={16} display={"flex"} flex={{xs:1, md:0.5}} justifyContent={"center"} alignItems={"center"}>
          <form style={{
            margin: "auto",
            padding: "20px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
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
              </Box>
            </form>
        </Box>
      </Box>
    </>
  )
}

export default SignIn