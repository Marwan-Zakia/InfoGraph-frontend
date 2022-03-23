/** @format */

import React from "react";
import cookie from "react-cookies";
import jwt from "jsonwebtoken";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext();
/**
 *
 */
/**
 * @param {mothod} capability
 * @returns {boolean}
 * @description checks if the user has the capability
 * @param {mothod} login  - login method  - allow user to login and saves the token in the cookies
 * @param {mothod} logout - logout method - allow user to logout and deletes the token from the cookies
 * @param {mothod} vailidateToken - validate the token with the same secret that came from the backend  and if the token is valid 
 *  i call the logInstate with the data 
 * @member {mothod} logInstate - sets the user login state so that the user can be logged in or logged 
 * out i use it to either clear the user data in the logout mothed or to set the user data in the login mothed
 * @param {boolean} isLogged - isLogged - checks if the user is is Logged in or not
 * @param {object} user - user  - user object
 * @member {mothod} onmount(componentDidMount) gets the cookie and validate the token if found
 *
 *
 *
 */
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
