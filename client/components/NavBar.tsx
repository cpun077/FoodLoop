import Link from "next/link"

interface NavBarProps {
    auth: boolean;
    method: () => void; // Adjust this type based on what your method does
  }

export default function NavBar(props:NavBarProps) {
    return (
        <div className="nav-bar-parent">
            <div className="nav-bar">
                <Link href={"/"}>
                    <img className="foodloop-logo-1" alt="" src="https://drive.google.com/thumbnail?id=1nqead4zKVwK5dLZE3k3ylAEJGQnbNemu" />
                </Link>

                <div className="navbarbuttons">
                    <Link className="about-us" href={"/login"}>
                        About Us
                    </Link>
                    <Link className="about-us" href={"/login"}>
                        FAQ
                    </Link>
                    <Link className="about-us" href={"/login"}>
                        History
                    </Link>
                    <Link className="about-us" href={"/login"}>
                        Chat
                    </Link>
                    {props.auth ? (
                        <button className="about-us" onClick={props.method}>
                            Sign Out
                        </button>
                    ) : (
                        <Link className="about-us" href={"/login"}>
                            Sign In
                        </Link>
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