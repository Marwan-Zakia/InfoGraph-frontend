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
				const approvedProjectStates = approved.map(
					(item) => item.statusOfFunding,
				);
				const approvedProjectNames = approved.map(
					(item) => item.projectName,
				);

				const rejectedProject = data.filter(
					(item) => item.statusOfFunding === "rejected",
				);
				const rejectedProjectStates = rejectedProject.map(
					(item) => item.statusOfFunding,
				);
				const rejectedProjectNames = rejectedProject.map(
					(item) => item.projectName,
				);

				const PendingPorjects = data.filter(
					(item) => item.statusOfFunding === "Pending",
				);
				const PendingProjectStates = PendingPorjects.map(
					(item) => item.statusOfFunding,
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
							data: [approvedProjectStates.length],
						},
					],
				});
				setPending({
					...Pending,
					labels: [...PendingProjectNames],
					datasets: [
						{
							...Pending.datasets[0],
							data: [PendingProjectStates.length],
						},
					],
				});
				setrejected({
					...rejected,
					labels: [...rejectedProjectNames],
					datasets: [
						{
							...rejected.datasets[0],
							data: [rejectedProjectStates.length],
						},
					],
				});
			});
	},[]);

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
