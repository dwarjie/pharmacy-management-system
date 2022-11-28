// This component prints the invoice for the pos
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintInvoice = () => {
	let componentRef = useRef();

	return (
		<div className="container">
			<ReactToPrint
				trigger={() => (
					<button className="btn btn-primary">Print Invoice</button>
				)}
				content={() => componentRef}
			/>
			<div className="container">
				<ComponentToPrint ref={(element) => (componentRef = element)} />
			</div>
		</div>
	);
};

// component to be printed
class ComponentToPrint extends React.Component {
	render() {
		const getPageMargins = () => {
			const marginTop = "50px";
			const marginRight = "25px";
			const marginBottom = "50px";
			const marginLeft = "25px";
			return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
		};

		return (
			<div>
				<style>{getPageMargins()}</style>
				<h2 style={{ color: "green" }}>Attendance</h2>
				<table style={{ width: "60%", marginTop: "50px" }}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Njoku Samson</td>
							<td>samson@yahoo.com</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Ebere Plenty</td>
							<td>ebere@gmail.com</td>
						</tr>
						<tr>
							<td>3</td>
							<td>Undefined</td>
							<td>No Email</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default PrintInvoice;
