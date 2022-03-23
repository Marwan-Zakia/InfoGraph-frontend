/** @format */

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./auth/context";
import Card from "./Card";
/**
 * 
 * @returns renders cards for the projectOwner with the data from the api
 * and filters the data by thier name 
 * @calls the api every 30 seconds
 */
export default function ProjectOwner() {
	const [porjectData, setporjectData] = useState([]);
	const useAuth = useContext(AuthContext);
	const Uesername = useAuth?.user?.username;
	useEffect(() => {
		const pull =setInterval(() => {
		axios
			.get("https://infograph-back.herokuapp.com/project")
			.then(({ data }) => {
				setporjectData(data);
				console.log("asdasdasd", data);
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
			{UserProjects.map((project, index) => {
				return (
					<Card
						key={index}
						projectName={project.projectName}
						userName={project.userName}
						projectDesc={project.projectDesc}
						projectSector={project.projectSector}
						statusOfFunding={project.statusOfFunding}
						numberOfEmloyees={project.numberOfEmloyees}
					/>
				);
			})}
		</div>
	);
}
