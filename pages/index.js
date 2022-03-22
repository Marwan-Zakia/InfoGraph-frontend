/** @format */

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../components/auth/context";
export default function Home() {
	const useAuth = useContext(AuthContext);
	return (
		<>
			<Link color="#b57295" href="/login">
				Login
			</Link>
			<Link color="#b57295" href="/signup">
				signup
			</Link>
			<Link color="#b57295" href="/porjects">
				porjects
			</Link>
			<Link color="#b57295" href="/admin">
				admin
			</Link>
			<button
				onClick={() => {
					location.reload();
					useAuth.logout;
				}}
			>
				log out
			</button>
		</>
	);
}
