import React from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { PieChart } from "react-minimal-pie-chart";

function Chart(props) {
	return (
		<PieChart
			animation
			animationDuration={500}
			animationEasing="ease-out"
			center={[50, 40]}
			data={[
				{
				color: "blue",
				title: "Savings",
				value: props.savings,
				},
				{
				color: "red",
				title: "Expenses",
				value: props.expenses,
				},
			]}
			labelPosition={50}
			lengthAngle={360}
			lineWidth={100}
			paddingAngle={0}
			radius={30}
			startAngle={0}
			viewBoxSize={[100, 100]}
					/>
	);
}

export default Chart;