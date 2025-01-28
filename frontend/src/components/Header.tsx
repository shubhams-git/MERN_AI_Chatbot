import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext"
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
    const auth = useAuth();
  return (
    <AppBar
    sx={{backgroundColor: 'transparent', boxShadow: 'none', position: 'static'}}>
        <Toolbar sx={{display: 'flex'}}>
            <Logo />
            {auth?.isSignedIn ? 
            <>
                <NavigationLink bg="#00fffc"
                    to="/chat"
                    text="Go To Chat"
                    textColor="black"
                />
                <NavigationLink bg="#51538f"
                    textColor="white"
                    to="/"
                    text="logout"
                    onClick={auth?.signOut}
                />
            </>
            :<>
                <NavigationLink bg="#00fffc"
                    to="/signin"
                    text="Sign In"
                    textColor="black"
                />
                <NavigationLink bg="#51538f"
                    textColor="white"
                    to="/signup"
                    text="Sign Up"
                    onClick={auth?.signOut}
                />
            </>}
        </Toolbar>
    </AppBar>
  )
}

export default Header