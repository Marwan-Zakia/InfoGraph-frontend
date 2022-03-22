/** @format */

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/auth/context";
import ProjectOwner from "../components/projectOwner";

export default function Projects() {
	const useAuth = useContext(AuthContext);
	const [formdata, setformdata] = useState({
		userName: useAuth.user.username,
		projectName: "",
		projectDesc: "",
		projectSector: "",
		statusOfFunding: "Pending",
		numberOfEmloyees: "",
	});

	useEffect(() => {
		setformdata({
			userName: useAuth.user.username,
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
			.post("http://localhost:3002/project", formdata)
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
		<div>
			<h1>Projects</h1>
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

				<br />
				<input
					type="radio"
					name="numberOfEmloyees"
					value={"10-50"}
					checked={formdata.numberOfEmloyees === "10-50"}
					onChange={handleChange}
				/>
				<label htmlFor="10-50">Emloyees : 10-50</label>
				<br />
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
				<br />
				<input
					type="radio"
					name="numberOfEmloyees"
					value={"1000-more"}
					onChange={handleChange}
					checked={formdata.numberOfEmloyees === "1000-more"}
				/>
				<label htmlFor="1000-more"> Emloyees : 1000-more...</label>
				<br />

				<button type="submit">Submit</button>
			</form>

<div>

<ProjectOwner/>
    
</div>



		</div>
	);
}
