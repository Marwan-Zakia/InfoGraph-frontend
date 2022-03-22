/** @format */

import React, { Component } from "react";
import { FormErrors } from "../components/auth/authErr";
import axios from "axios";
import { When } from "react-if";
import { AuthContext } from "../components/auth/context";
import Swal from "sweetalert2";
import Auth from "../components/auth/auth";
import Router from "next/router";
import Link from "next/link";

class Signup extends Component {
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
		console.log();
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		let username = this.state.name;
		let role = this.state.role;
		let url = "https://infograph-back.herokuapp.com/signup";
		let obj = { email, password, username, role };

		await axios
			.post(url, obj)
			.then((result) => {
				console.log(result.data);
				console.log("here is the status");
				if (result.status === 201) {
					Swal.fire({
						position: "centered",
						icon: "success",
						title: "Your Account Created Successfully",
						showConfirmButton: false,
						timer: 1500,
					});
					Router.push("/login");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleUserInput = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ ...this.state, [name]: value }, () => {
			this.validateField(name, value);
		});
		console.log(this.state);
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
				fieldValidationErrors.email = emailValid
					? ""
					: "  is invalid";
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
				<div className="container">
					<div className="grid2">
						<img src="/large_seedingfund-01.png" alt="log" />
						<h1>Create your account</h1>
					</div>

					<div className="formGroup">
						<FormErrors formErrors={this.state.formErrors} />
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
						<div className="form">
							<form>
								<input
									type="text"
									className="form-control"
									name="name"
									placeholder="Username"
									value={this.state.name}
									onChange={this.handleUserInput}
								/>
							
								<input
									type="email"
									required
									className="form-control"
									name="email"
									placeholder="Email"
									value={this.state.email}
									onChange={this.handleUserInput}
								/>
							
								<input
									type="password"
									className="form-control"
									name="password"
									placeholder="Password"
									value={this.state.password}
									onChange={this.handleUserInput}
								/>
							
								<select
									name="role"
									placeholder="Select the your role"
									onChange={this.handleUserInput}
									value={this.state.role}
								>
								
									<option>Select the your role</option>
									<option value="admin">admin</option>
									<option value="projectsowners">
										projectsowners
									</option>
								</select>
					
								<Link className="link" href="/login">
									Login
								</Link>
							
								<button
									onClick={this.handleSubmit}
									type="submit"
									disabled={!this.state.formValid}
								>
									Sign up
								</button>
							
							</form>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Signup;
