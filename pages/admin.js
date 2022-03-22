/** @format */
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/auth/context";
import Charts from "../components/charts";

export default function Admin() {
	const useAuth = useContext(AuthContext);
	const Uesername = useAuth.user.username;

	const [porjectData, setporjectData] = useState([]);

	useEffect(() => {
		// const pull = setInterval(() => {
		axios.get("http://localhost:3002/project").then(({ data }) => {
			setporjectData(data);
			console.log(data);
		});
		// }, 1000);
		// return () => {
		// 	clearInterval(pull);
		// };
	}, []);

	const deleteProject = (project) => {
		const id = project.id;
		console.log(id);
		axios
			.delete(`http://localhost:3002/project/${id}`)
			.then(({ data }) => {
				console.log(data);
				setporjectData(
					porjectData.filter((project) => project.id !== id),
				);
			});
	};

	const updateProject = (project) => {
		const id = project.id;
		axios
			.put(`http://localhost:3002/project/${id}`, project)
			.then(({ data }) => {
				console.log(data);
				setporjectData([...porjectData, data]);
			});
	};

	return (
		<div>
			<h1>Admin</h1>

			{porjectData.map((project, index) => {
				return (
					<div key={index}>
						<p>{project.projectName}</p>
						<p>{project.projectDesc}</p>
						<p>{project.projectSector}</p>
						<p>
						
							Current status of funding : {project.statusOfFunding} 
						</p>
						<p>{project.numberOfEmloyees}</p>
						<button onClick={() => deleteProject(project)}>
							Delete
						</button>
						<select
							name="projectSector"
							value={project.statusOfFunding}
							onChange={(e) =>
								updateProject({
									...project,
									statusOfFunding: e.target.value,
								})
							}
						>
							<option value="Pending">Pending</option>
							<option value="approved">approved</option>
							<option value="rejected">rejected</option>
						</select>
					</div>
				);
			})}
			<Charts />
		</div>
	);
}
