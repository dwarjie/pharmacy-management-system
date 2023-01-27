import { useEffect, useState } from "react";
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

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = ({ productData, title, labelTitle }) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(typeof productData);
		if (productData) {
			addData();
			setLoading(false);
		}
	}, []);

	const option = {
		responsive: true,
		resizeDelay: 0,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	const addData = () => {
		const data = {
			labels: getLabel(),
			datasets: [
				{
					label: labelTitle,
					data: getData(),
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		};
		setData(data);
		console.log(data);
	};

	const getLabel = () => {
		let labels = productData.map((product) => {
			console.log(product);
			return product.medicine.ProductName;
		});

		console.log(labels);
		return labels;
	};

	const getData = () => {
		let dataValue = productData.map((product) => {
			return product.totalQuantity;
		});

		console.log(dataValue);
		return dataValue;
	};

	return (
		<>
			<div
				className="container-fluid"
				style={{ width: "50%", margin: "0 auto", height: "auto" }}
			>
				{loading ? "" : <Bar data={data} options={option} />}
			</div>
		</>
	);
};

export default BarChart;
