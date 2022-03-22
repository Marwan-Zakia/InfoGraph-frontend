/** @format */

export default function Card({
	userName,
	projectName,
	projectDesc,
	projectSector,
	statusOfFunding,
	numberOfEmloyees,
}) {
	return (
		<div className="card">
			<h1 className="header">
				Project: {projectName} and was created by {userName}
			</h1>
			<article className="content">
				The project is {projectDesc}
				and it`s about {projectSector}
				with a count of {numberOfEmloyees} employees and curruntly its
				{statusOfFunding}
			</article>
		</div>
	);
}
