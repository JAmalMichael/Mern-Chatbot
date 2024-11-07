import { Link, LinkProps } from "react-router-dom";

interface NavProps extends LinkProps {
    to: string;
    bg?: string ;
    text?: string; 
    textColor?: string;
    onClick?: () => Promise<void>;
}

const NavigationLink: React.FC<NavProps> = ({ to, bg, textColor, text, onClick}) => {

    //handle the onclik prop if provided
    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if(onClick) {
            e.preventDefault() // Prevent default link behavior if onClick is provided
            await onClick();
        }
    }

  return (
    <Link 
    className="nav-link uppercase mx-2 px-4 py-2 rounded-md leading-1 text-sm"
    to={to} 
    style={{ background: bg, color: textColor }} 
    onClick={handleClick}
>
    {text}
    </Link>
  )
}

export default NavigationLink