/** @format */

import AuthProvider from "../components/auth/context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import "../styles/globals.scss";

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
/* 
Marwanamir
johnandrew1150@gmail.com
johnandrew1150@gmail.com

*/