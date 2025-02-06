import { Typography } from "@mui/material"
import { Link } from "react-router"

const Logo = () => {
  return (
    <div style={{
        display:"flex",
        marginRight:"auto",
        alignItems:"center",
        gap:"8px"
    }}>
        <Link to={"/"}>
            <img src="router.svg" alt="OpenRouter" width={"50px"} height={"50px"} style={{marginTop:"6px"}} className="image-inverted" />
        </Link>
        <Typography sx={{ 
                display:{md:"inline-block", sm: "none", xs: "none"},
                mr:"auto",
                items:"center",
                fontSize:"20px",
                fontWeight:"800",
                textShadow:"2px 2px 20px #000"
                }}
            >
                <span style={{fontSize:"25px",}}>Rizz</span>-Bot
                    
            </Typography>
    </div>
  )
}

export default Logo