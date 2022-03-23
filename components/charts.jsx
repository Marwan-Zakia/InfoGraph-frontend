/** @format */
import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);
/**
 * @component {Charts}
 **  I used @param just to highlight the comments 
 * @can be called as @Charts component 
 @param {approved} function  to filter the data by approved and used it for lenght of array
 @param {approvedProjectNames} function   to get the project names from approved array
 @param {rejectedProject} function  to filter the data by rejected and used it for lenght of array
 @param {rejectedProjectNames} function   to get the project names from rejected array
 @param {PendingPorjects} function  to filter the data by pendingand used it for lenght of array
 @param {pendingProjectNames} function   to get the project names from pending array
 * @returns renders a charts with the data from the api

 * 

 */

export default function Charts() {
	const [states, setstates] = useState({
		labels: [],
		datasets: [
			{
				label: "Approved",
				data: [],
				backgroundColor: "#006400",
			},
		],
	});
	const [Pending, setPending] = useState({
		labels: [],
		datasets: [
			{
				label: "Pending",
				data: [],
				backgroundColor: "#696969",
			},
		],
	});
	const [rejected, setrejected] = useState({
		labels: [],
		datasets: [
			{
				label: "Rejected",
				data: [],
				backgroundColor: "#FF7F50",
			},
		],
	});

	useEffect(() => {
		console.log("useEffect");
		axios
			.get("https://infograph-back.herokuapp.com/project")
			.then(({ data }) => {
				const approved = data.filter(
					(item) => item.statusOfFunding === "approved",
				);
				const approvedProjectNames = approved.map(
					(item) => item.projectName,
				);

				const rejectedProject = data.filter(
					(item) => item.statusOfFunding === "rejected",
				);
				const rejectedProjectNames = rejectedProject.map(
					(item) => item.projectName,
				);

				const PendingPorjects = data.filter(
					(item) => item.statusOfFunding === "Pending",
				);

				const PendingProjectNames = PendingPorjects.map(
					(item) => item.projectName,
				);

				setstates({
					...states,
					labels: [...approvedProjectNames],
					datasets: [
						{
							...states.datasets[0],
							data: [approved.length],
						},
					],
				});
				setPending({
					...Pending,
					labels: [...PendingProjectNames],
					datasets: [
						{
							...Pending.datasets[0],
							data: [PendingPorjects.length],
						},
					],
				});
				setrejected({
					...rejected,
					labels: [...rejectedProjectNames],
					datasets: [
						{
							...rejected.datasets[0],
							data: [rejectedProject.length],
						},
					],
				});
			});
	}, []);

	return (
		<div className="charts">
			<Bar
				style={{
					height: "350px",
					width: "350px",
					border: "1px solid #000000",
					borderRadius: "5px",
					margin: "10px",
				}}
				options={options}
				data={states}
			/>

			<Bar
				style={{
					height: "350px",
					width: "350px",
					border: "1px solid #000000",
					borderRadius: "5px",
					margin: "10px",
				}}
				options={options2}
				data={Pending}
			/>

			<Bar
				style={{
					height: "350px",
					width: "350px",
					border: "1px solid #000000",
					borderRadius: "5px",
					margin: "10px",
				}}
				options={options2}
				data={rejected}
			/>
		</div>
	);
}

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "approved projects",
		},
	},
};
export const options2 = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "rejected projects",
		},
	},
};
export const options3 = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Pending projects",
		},
	},
};
