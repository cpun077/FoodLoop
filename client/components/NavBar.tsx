import Link from "next/link"
import Image from "next/image";
import logo from "../app/assets/logo.png"

const NavBarButton = ({ link, text }: { link: string; text: string }) => {
    return (
        <Link className="about-us" href={link}>
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

                <div className="navbarbuttons">
                    <NavBarButton link="/login" text="About Us"/>
                    <NavBarButton link="/login" text="FAQ"/>
                    <NavBarButton link="/login" text="History"/>
                    <NavBarButton link="/chat" text="Chat"/>
                    {auth ? (
                        <button className="about-us" onClick={method}>
                            Sign Out
                        </button>
                    ) : (
                        <NavBarButton link="/login" text="Sign In"/>
                    )}
                </div>
            </div>
            <div className="line">
                <div className="line-child">
                </div>
            </div>
        </div>
    )
}