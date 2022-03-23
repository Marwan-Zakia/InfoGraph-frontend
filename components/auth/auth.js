/** @format */

import React from "react";
import { When } from "react-if";
import { AuthContext } from "./context";

/**

 *  check if the user is authenticated 
 * 
 * @param {props } capability checks the capability of the user ex: admin has the delete capability
 *  therefore he views the delete button or a component 
 * @can be called as @Auth component
 * 
 */
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
