/** @format */

import AuthProvider from "../components/auth/context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import "../styles/globals.scss";
import "../styles/header.scss";
import "../styles/main.scss";
import "../styles/login.scss";
import "../styles/porjectform.scss";
import "../styles/card.scss";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Header />
			<Component {...pageProps} />
			<Footer/>
		</AuthProvider>
	);
}

export default MyApp;
