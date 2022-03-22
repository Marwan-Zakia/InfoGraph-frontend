/** @format */
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/auth/context";
import Card from "../components/Card";
import Charts from "../components/charts";

export default function Admin() {
	const useAuth = useContext(AuthContext);
	const Uesername = useAuth.user.username;

	const [porjectData, setporjectData] = useState([]);

	useEffect(() => {
		// const pull = setInterval(() => {
		axios
			.get("https://infograph-back.herokuapp.com/project")
			.then(({ data }) => {
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
			.delete(`https://infograph-back.herokuapp.com/project/${id}`)
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
			.put(
				`https://infograph-back.herokuapp.com/project/${id}`,
				project,
			)
			.then(({ data }) => {
				console.log(data);
				setporjectData([...porjectData, data]);
			});
	};

	return (
		<div className="admin">
			<div className="adminCards">
				{porjectData.map((project, index) => {
					return (
						<div key={index} className="countiuation">
							<Card
								projectName={project.projectName}
								userName={project.userName}
								projectDesc={project.projectDesc}
								projectSector={project.projectSector}
								statusOfFunding={project.statusOfFunding}
								numberOfEmloyees={project.numberOfEmloyees}
							/>

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
							<button onClick={() => deleteProject(project)}>
								Delete
							</button>
						</div>
					);
				})}
			</div>
			<div >
				<Charts />
			</div>
		</div>
	);
}
