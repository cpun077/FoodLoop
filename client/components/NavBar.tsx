import Link from "next/link"
import Image from "next/image";
import logo from "../app/assets/logo.png"
import './navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import AuthButton from "@/components/AuthButton";

const NavBarButton = ({ link, text }: { link: string; text: string; }) => {
    return (
        <Link className="nav-bar-button" href={link}>
            {text}
        </Link>
    )
}

export default function NavBar() {
    return (
        <div className="nav-bar-parent">
            <div className="nav-bar">
                <Link href={"/"}>
                    <Image className="foodloop-logo-1" alt="Logo" src={logo} />
                </Link>

                <div className="nav-bar-button-container">
                    <NavBarButton link="/login" text="About Us" />
                    <NavBarButton link="/login" text="FAQ" />
                    <NavBarButton link="/login" text="History" />
                    <NavBarButton link="/chat" text="Chat" />
                    <AuthButton />
                </div>
                <div className="navmenu">
                    <MenuIcon />
                </div>
            </div>
            <div className="line">
                <div className="line-child">
                </div>
            </div>
        </div>
    )
}