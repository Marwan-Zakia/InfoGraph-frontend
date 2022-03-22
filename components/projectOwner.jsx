/** @format */

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./auth/context";

export default function ProjectOwner() {
	const [porjectData, setporjectData] = useState([]);
	const useAuth = useContext(AuthContext);
	const Uesername = useAuth.user.username;
	useEffect(() => {
		const pull =setInterval(() => {
			axios.get("http://localhost:3002/project").then(({ data }) => {
				setporjectData(data);
				console.log(data);
			});
		}, 30000);
		return () => {
			clearInterval(pull);
		};
	}, []);

	const UserProjects = porjectData.filter(
		(project) => project.userName === Uesername,
	);

	return (
		<div>
			<h1>Project Owner</h1>
			<p>{Uesername}</p>
			{UserProjects.map((project, index) => {
				return (
					<div key={index}>
						<p>{project.projectName}</p>
						<p>{project.projectDesc}</p>
						<p>{project.projectSector}</p>
						<p>{project.statusOfFunding}</p>
						<p>{project.numberOfEmloyees}</p>
					</div>
				);
			})}
		</div>
	);
}
