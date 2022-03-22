/** @format */

import AuthProvider from "../components/auth/context";
import "../styles/globals.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
