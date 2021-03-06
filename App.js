import React, { Component } from 'react';
import {
	StyleSheet, View, Button, Text, TouchableHighlight, Alert,
	Modal, TextInput
} from 'react-native';

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
		sorted: {},
		modalVisible: false,
		model: '',
		brand: '',
		type: ''
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

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	render() {
		const { modalVisible, tableHead, vehicles, model, brand, type } = this.state;
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.row}>
						{tableHead.map(
							cell => <Text key={cell} onPress={() => this.sortCars(cell)}>{cell}</Text>
						)}
					</View>

					{vehicles.
						map(vehicle => <View key={vehicle.id} style={styles.row}>
							<Text>{vehicle.model}</Text>
							<Text>{vehicle.brand}</Text>
							<Text>{vehicle.type}</Text>
							<Button title="x"
								onPress={() => this.deleteCars(vehicle.id)}
							/>
						</View>
						)}
				</View>

				<View style={styles.centeredView}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<View>
									<TextInput style={styles.modalText} value={model} onChangeText={text => this.setState({ model: text.trim() })} placeholder="enter model" />
									{(model.length < 3) && <Text style={styles.errorValidation}>Vehicle name must be at least 3 characters</Text>}
								</View>
								<View>
									<TextInput style={styles.modalText} value={brand} onChangeText={text => this.setState({ brand: text })} placeholder="enter brand" />
									{(model.length < 3) && <Text style={styles.errorValidation}>Vehicle brend must be at least 3 characters</Text>}
								</View>
								<View>
									<TextInput style={styles.modalText} value={type} onChangeText={text => this.setState({ type: text })} placeholder="enter type" />
									{(model.length < 3) && <Text style={styles.errorValidation}>Vehicle type must be at least 3 characters</Text>}
								</View>
								<View>
									<Button style={styles.addButton} title="Add car" onPress={() => {
										const newCar = {
											id: Date.now(),
											model,
											brand,
											type
										};
										(model.length < 3)
											? !newCar
											: this.setState({
												vehicles: [...vehicles, newCar],
												model: '',
												brand: '',
												type: ''
											})
									}} />

								</View>

								<TouchableHighlight
									style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
									onPress={() => {
										this.setModalVisible(!modalVisible);
									}}
								>
									<Text>Close</Text>
								</TouchableHighlight>
							</View>
						</View>
					</Modal>

					<TouchableHighlight
						style={styles.openButton}
						onPress={() => {
							this.setModalVisible(true);
						}}
					>
						<Text style={styles.textStyle}>Add Car</Text>
					</TouchableHighlight>
				</View>

			</View >


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
	},

	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		position: 'relative'
	},
	openButton: {
		backgroundColor: "green",
		borderRadius: 20,
		padding: 10,
		elevation: 2,

	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: 'green'
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		height: 40,
		width: 200,
		borderColor:
			'gray',
		borderWidth: 1
	},
	errorValidation: {
		color: 'red',
		marginTop: -15,
		fontSize: 12
	},
	addButton: {
		marginBottom: 20,
		padding: 2,
		backgroundColor: 'green'
	},
});