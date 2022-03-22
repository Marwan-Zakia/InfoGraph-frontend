/** @format */

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../components/auth/context";
export default function Home() {
	const useAuth = useContext(AuthContext);
	return (
		<>
			<header className="mid">
				<h1>Seeding Fund</h1>
				<h3>The leading site to get your`e project up </h3>
			</header>
		</>
	);
}
