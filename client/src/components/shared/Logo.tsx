import  Typography  from "@mui/material/Typography"
import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <div className="mr-auto flex items-center gap-2">
        <Link to={"/"}>
            <img src="openai.png" width={"30px"} height={"30px"} className="image-inverted object-contain"/>
        </Link>
            <Typography sx={{
                display: {
                    md: "block",
                    small: "none",
                    xs: "none"
            },
                mr: "auto",
                fontWeight: "800",
                textShadow: "2px 2px 20px #000",
            }}>
                <span className="text-[20px]">JAMAL</span>-GPT
            </Typography>
    </div>
  )
}

export default Logo