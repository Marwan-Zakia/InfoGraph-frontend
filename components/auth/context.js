/** @format */

import React from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext();

export default class AuthProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false,
			user: { email: "", username: "", capabilities: [] },
			capability: this.capability,
			login: this.login,
			logout: this.logout,
		};
	}

	capability = (capability) => {
		return this.state?.user?.capabilities.includes(capability);
	};

	login = async (
		email,
		password,
		username = this.state.user.username,
	) => {
		try {
			const token = Buffer.from(`${email}:${password}`).toString(
				"base64",
			);
			const auth = `Basic ${token}`;
			let data = "";
			let config = {
				method: "post",
				url: "https://infograph-back.herokuapp.com/signin",
				headers: {
					Authorization: auth,
				},
				data: data,
			};
			await axios(config)
				.then((response) => {
					data = response.data;
					this.setState({
						token: data.token,
						isLogged: true,
						user: {
							email: data.email,
							username: data.username,
						},
						capabilities: data.capabilities,
					});

					this.vailidateToken(data.token);
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (err) {
			console.error(err);
		}
	};
	logout = () => {
		cookie.remove("infoauth", { path: "/" });
		this.logInstate(false, null, {}, null);
	};
	logInstate = (isLogged, token, user, username) => {
		console.log("token", token);
		cookie.save("infoauth", token, { path: "/" });
		this.setState({
			isLogged: isLogged,
			token: token,
			user: user,
			username: username,
		});
		// return user;
	};

	vailidateToken = (token) => {
		try {
			const decoded = jwt.verify(
				token,
				process.env.REACT_APP_SECRET || "SECRET",
			);
			let userName = this.state.user.username;
			this.logInstate(true, token, decoded, userName);
		} catch (err) {
			this.logInstate(false, null, {}, null);
			console.error(err);
		}
	};
	componentDidMount() {
		const search = new URLSearchParams(window.location.search);
		const tokenFromCookie = search.get("token");
		const token = tokenFromCookie || cookie.load("infoauth") || null;
		this.vailidateToken(token);
	}
	render() {
		return (
			<AuthContext.Provider value={this.state}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
