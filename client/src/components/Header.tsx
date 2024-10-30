import { AppBar, Toolbar } from '@mui/material'

const Header = () => {
  return (
    <AppBar sx={{ bgcolor:"Transparent", position: "static", boxShadow: "none" }}> 
        <Toolbar sx={{ display: "flex" }}>

        </Toolbar>
    </AppBar>
  )
}

export default Header