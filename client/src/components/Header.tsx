import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink';


const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor:"Transparent", position: "static", boxShadow: "none" }}> 
        <Toolbar sx={{ display: "flex" }}>
            <Logo />
            <div>
              {auth?.isLoggedIn ? (
                <>
                <NavigationLink to="/chat" bg="#00fffc" text="Go To Chat" textColor= "black" />
                <NavigationLink to="/" bg="#51538f" text="logout" textColor= "white" onClick={auth.logout}/>
                </>
              )
              : 
              (
                <>
                <NavigationLink
                  bg="#00fffc"
                  to="/login"
                  text="Login"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  textColor="white"
                  to="/signup"
                  text="Signup"
                />
              </>
              )
              }
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Header