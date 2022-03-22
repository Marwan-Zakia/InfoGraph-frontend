/** @format */

import React, { Component } from "react";
import { FormErrors } from "../components/auth/authErr";
import axios from "axios";
import { LoginContext } from "../components/auth/context";
import base64 from "base-64";
import { When } from "react-if";
import { AuthContext } from "../components/auth/context";
import Swal from "sweetalert2";
import Auth from "../components/auth/auth";
import Router from "next/router";
import Link from "next/link";
import superagent from "superagent";
export default class Login extends Component {
	static contextType = AuthContext;
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			formErrors: { email: "", password: "" },
			emailValid: false,
			passwordValid: false,
			formValid: false,
			name: "",
			role: "",
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		let API = "http://localhost:3002/signin";
		console.log(this.state.email, this.state.password);
		const response = await superagent
			.post(`${API}`)
			.set(
				"authorization",
				`Basic ${base64.encode(
					`${this.state.email}:${this.state.password}`,
				)}`,
			);
		console.log("this is the response ", response.status);
		if (response.status === 200) {
			Swal.fire({
				position: "centered",
				icon: "success",
				title: "You Logged in successfully",
				showConfirmButton: false,
				timer: 1500,
			});
			this.context.login(
				this.state.email,
				this.state.password,
				response.body,
			);
			console.log(response.body, "response");
		}
		Router.push("/");
	};

	handleUserInput = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ ...this.state, [name]: value }, () => {
			this.validateField(name, value);
		});
	};

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors;
		let emailValid = this.state.emailValid;
		let passwordValid = this.state.passwordValid;

		switch (fieldName) {
			case "email":
				emailValid = value.match(
					/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
				);
				fieldValidationErrors.email = emailValid ? "" : " is invalid";
				break;
			case "password":
				passwordValid = value.length >= 8;
				fieldValidationErrors.password = passwordValid
					? ""
					: " is too short";
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				emailValid: emailValid,
				passwordValid: passwordValid,
			},
			this.validateForm,
		);
	}

	validateForm() {
		this.setState({
			formValid: this.state.emailValid && this.state.passwordValid,
		});
	}
	errorClass(error) {
		return error.length === 0 ? "" : "has-error";
	}

	render() {
		return (
			<>
				<FormErrors formErrors={this.state.formErrors} />

				<h1>Welcome Back</h1>
				<div
					className={`form-group ${this.errorClass(
						this.state.formErrors.email,
					)}`}
				></div>
				<div
					className={`form-group ${this.errorClass(
						this.state.formErrors.password,
					)}`}
				></div>

				<div className="form-group">
					<form>
						<input
							type="text"
							name="name"
							placeholder="Username"
							value={this.state.name}
							onChange={this.handleUserInput}
						/>

						<input
							type="email"
							required
							name="email"
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleUserInput}
						/>

						<input
							type="password"
							name="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.handleUserInput}
						/>

						<button
							onClick={this.handleSubmit}
							type="submit"
							disabled={!this.state.formValid}
						>
							Login
						</button>
					</form>
				</div>
			</>
		);
	}
}
