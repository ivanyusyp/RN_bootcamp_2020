import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

let initial = [
	{ id: 14, model: "156", brand: "Alfa Romeo", type: "Car" },
	{ id: 17, model: "206", brand: "Peugeot", type: "Car" },
	{ id: 24, model: "307", brand: "Peugeot", type: "Car" },
	{ id: 29, model: "323", brand: "Mazda", type: "Car" },
	{ id: 519, model: "WR", brand: "Yamaha", type: "Motorcycle" },
	{ id: 600, model: "Raptor", brand: "Yamaha", type: "Motorcycle" }]

export default class App extends Component {
	state = {
		tableHead: ['model', 'brand', 'type', ''],
		vehicles: initial,
		sortBy: "",
		sorted: {}
	}

	sortCars = sortBy => {
		if (!this.state.sorted[sortBy]) {
			this.setState(
				{
					vehicles: this.state.vehicles.sort((a, b) => a[sortBy] !== b[sortBy] ? a[sortBy] < b[sortBy] ? -1 : 1 : 0),
					sorted: { ...this.state.sorted, [sortBy]: true }
				}
			)
		}
		else if (this.state.sorted[sortBy] === true) {
			this.setState(
				{
					vehicles: this.state.vehicles.sort((a, b) => a[sortBy] !== b[sortBy] ? a[sortBy] < b[sortBy] ? 1 : -1 : 0),
					sorted: { ...this.state.sorted, [sortBy]: false }
				}
			)
		}
	}

	deleteCars = id => {
		const findIndex = this.state.vehicles.findIndex(vehicle => id === vehicle.id);
		const vehiclesCopy = [...this.state.vehicles];
		vehiclesCopy.splice(findIndex, 1);
		this.setState({
			vehicles: vehiclesCopy
		})
	}
	render() {
		const state = this.state;
		console.log(state);
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.row}>
						{state.tableHead.map(
							cell => <Text onPress={() => this.sortCars(cell)}>{cell}</Text>
						)}
					</View>

					{state.vehicles.
						map(vehicle => <View style={styles.row}>
							<Text>{vehicle.model}</Text>
							<Text>{vehicle.brand}</Text>
							<Text>{vehicle.type}</Text>
							<Button title="x"
								onPress={() => this.deleteCars(vehicle.id)}
							/>
						</View>
						)}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	head: { height: 40, backgroundColor: '#f1f8ff' },
	text: { margin: 6 },
	row: {
		display: "flex",
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	}
});