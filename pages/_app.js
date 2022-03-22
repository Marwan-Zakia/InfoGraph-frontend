/** @format */

import AuthProvider from "../components/auth/context";
import Header from "../components/Header";
import "../styles/globals.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Header />
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
