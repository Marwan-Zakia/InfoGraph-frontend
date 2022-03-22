/** @format */

import React from "react";
import { When } from "react-if";
import { AuthContext } from "./context";
export default class Login extends React.Component {
	static contextType = AuthContext;

	render() {
		const isLogged = this.context.isLogged;
		const IsCapabale = this.props.capabilities
			? this.context.capability(this.props.capabilities)
			: true;
		const render = isLogged && IsCapabale;
		return (
			<When condition={render}>
				{this.props.children}
			</When>
		);
	}
}
