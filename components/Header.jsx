/** @format */
import { useContext } from "react";
import { AuthContext } from "../components/auth/context";
import Link from "next/link";
export default function Header() {
    const useAuth = useContext(AuthContext);
	
	return (
		<>
			<header className="upper">
				<Link href="/">
					<a>🗺️ 2Queen Street,USA</a>
				</Link>
				<Link href="/">
					<a>📞 888-666-000</a>
				</Link>
				<Link href="/">
					<a>📥info@example.com</a>
				</Link>

				<Link href="/">
					<a>Get a Free Quote </a>
				</Link>
				<Link href="/">
					<a>🌐 english </a>
				</Link>
			</header>
			<header className="lower">
				<Link passHref href="/">
					<img src="/large_seedingfund-01.png" alt="logo" />
				</Link>
				<Link href="/">home</Link>
				<Link href="#">Blog</Link>
				<Link href="#">Portfolio</Link>
				<Link href="#">Pages</Link>
				<Link href="#">Feature</Link>
				<Link href="#">Contact</Link>
				<Link href="/login">Login</Link>
				<Link href="/admin">Admin</Link>
				<Link href="/porjects">porjects</Link>
				<Link href="/signup">Signup</Link>
				<Link href="#">🔍</Link>
				<button
					onClick={() => {
						location.reload();
						useAuth.logout;
					}}
				>
					log out
				</button>
			</header>
		
		</>
	);
}
