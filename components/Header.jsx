/** @format */
import { useContext } from "react";
import { AuthContext } from "../components/auth/context";
import Link from "next/link";
import Auth from "./auth/auth";
import { If, Then } from "react-if";
export default function Header() {
	const useAuth = useContext(AuthContext);
	console.log("sa", useAuth.isLogged);
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
				<Link href="/admin">Admin</Link>
				<Link href="/porjects">porjects</Link>
				<If condition={!useAuth.isLogged}>
					<Then>
						<Link href="/login">Login</Link>
					</Then>
				</If>

				<If condition={!useAuth.isLogged}>
					<Then>
						<Link href="/signup">Signup</Link>
					</Then>
				</If>
				<Link href="#">🔍</Link>
				<Auth>
					<button
						onClick={() => {
							location.reload();
							useAuth.logout();
						}}
					>
						log out
					</button>
				</Auth>
			</header>
		</>
	);
}
