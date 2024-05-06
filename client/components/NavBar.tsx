import Link from "next/link"
import Image from "next/image";
import logo from "../app/assets/logo.png"
import './navbar.css'

const NavBarButton = ({ link, text, action }: { link: string; text: string; action: () => void }) => {
    return (
        <Link className="nav-bar-button" href={link}>
            {text}
        </Link>
    )
}

export default function NavBar({ auth, method }: { auth: boolean; method: () => void }) {
    return (
        <div className="nav-bar-parent">
            <div className="nav-bar">
                <Link href={"/"}>
                    <Image className="foodloop-logo-1" alt="Logo" src={logo} />
                </Link>

                <div className="nav-bar-button-container">
                    <NavBarButton link="/login" text="About Us" action={() => {}}/>
                    <NavBarButton link="/login" text="FAQ" action={() => {}}/>
                    <NavBarButton link="/login" text="History" action={() => {}}/>
                    <NavBarButton link="/chat" text="Chat" action={() => {}}/>
                    <NavBarButton link="/login" text={auth?"Sign Out":"Sign In"} action={auth?() => {}:method}/>
                </div>
            </div>
            <div className="line">
                <div className="line-child">
                </div>
            </div>
        </div>
    )
}