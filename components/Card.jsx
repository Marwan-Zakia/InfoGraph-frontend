/** @format */


/**
 * 
 * @param {userName} 
 * @param {projectName} 
 * @param {projectDesc} 
 * @param {projectSector} 
 * @param {statusOfFunding} 
 * @param {	numberOfEmloyees}
 * @returns  a card with the data passed in the parameters
 * @can be called as @Card component
 */
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
