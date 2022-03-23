/** @format */

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { If,Else,Then } from "react-if";
import { AuthContext } from "../components/auth/context";
import ProjectOwner from "../components/projectOwner";

/**
 * 
 * @returns {Component} Projects page  with a form to add a new project and a list of projects
 * 
 */


export default function Projects() {
	const useAuth = useContext(AuthContext);
	const [formdata, setformdata] = useState({
		userName: useAuth?.user?.username,
		projectName: "",
		projectDesc: "",
		projectSector: "",
		statusOfFunding: "Pending",
		numberOfEmloyees: "",
	});

	useEffect(() => {
		setformdata({
			userName: useAuth?.user?.username,
			projectName: "",
			projectDesc: "",
			projectSector: "",
			statusOfFunding: "Pending",
			numberOfEmloyees: "",
		});
	}, [useAuth.user.username]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("https://infograph-back.herokuapp.com/project", formdata)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleChange = (e) => {
		setformdata({ ...formdata, [e.target.name]: e.target.value });
	};
	console.log(formdata);
	return (
		<If condition={useAuth.isLogged}>
			<Then>
				<div className="porjects">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="projectName"
							placeholder="Project Name"
							value={formdata.projectName}
							onChange={handleChange}
						/>

						<textarea
							type="text"
							name="projectDesc"
							placeholder="Project Description"
							value={formdata.projectDesc}
							onChange={handleChange}
						/>
						<select
							name="projectSector"
							value={formdata.projectSector}
							onChange={handleChange}
						>
							<option value="">Project Sector</option>
							<option value="Agriculture">Agriculture</option>
							<option value="Education">Education</option>
							<option value="Health">Health</option>
							<option value="Housing">Housing</option>
							<option value="Infrastructure">Infrastructure</option>
							<option value="Social">Social</option>
							<option value="Water">Water</option>
							<option value="Waste">Waste</option>
							<option value="Other">Other</option>
						</select>
						<div className="radio">
							<input
								type="radio"
								name="numberOfEmloyees"
								value={"10-50"}
								checked={formdata.numberOfEmloyees === "10-50"}
								onChange={handleChange}
							/>
							<label htmlFor="10-50">Emloyees : 10-50</label>
							<br />
							<input
								type="radio"
								name="numberOfEmloyees"
								value={"50-200"}
								checked={formdata.numberOfEmloyees === "50-200"}
								onChange={handleChange}
							/>
							<label htmlFor="50-200">Emloyees:50-200</label>
							<br />
							<input
								type="radio"
								name="numberOfEmloyees"
								value={"200-1000"}
								checked={formdata.numberOfEmloyees === "200-1000"}
								onChange={handleChange}
							/>
							<label htmlFor="200-1000"> Emloyees : 200-1000</label>
							<br />
							<input
								type="radio"
								name="numberOfEmloyees"
								value={"1000-more"}
								onChange={handleChange}
								checked={formdata.numberOfEmloyees === "1000-more"}
							/>
							<label htmlFor="1000-more">
								{" "}
								Emloyees : 1000-more...
							</label>
							<br />
						</div>
						<button type="submit">Submit</button>
					</form>

					<div>
						<ProjectOwner />
					</div>
				</div>
			</Then>
			<Else>
				<div style={{width:'100%' ,height:'800px' }}>
					<center>
						{" "}
						<h1>Please log in to be able to submit a Porject</h1>
					</center>
				</div>
			</Else>
		</If>
	);
}
