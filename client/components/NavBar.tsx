import Link from "next/link"

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
                    <img className="foodloop-logo-1" alt="" src="https://drive.google.com/thumbnail?id=1nqead4zKVwK5dLZE3k3ylAEJGQnbNemu" />
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