import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { FAB } from 'react-native-paper';
import HomeScreen from './HomeScreen';

const EquipmentDetailScreen = ({ route, navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const [result, setResults] = useState([]);
	const { id } = route.params;

	useEffect(() => {
		getResult(id);
	}, []);

	const getResult = async id => {
		const response = await axios.get(
			`https://www.dnd5eapi.co/api/equipment/${id}`
		);
		setResults(response.data);
		setLoaded(true);
		console.log(result);
	};
	return (
		<>
			<ImageBackground
				style={styles.dndTemplate}
				source={require('../../assets/DnDCardTemplate.png')}
			>
				{loaded ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.container}>
							<Text style={styles.font}>{result.name}</Text>
							<Text style={styles.category}>Category</Text>
							<Text style={styles.infoFont}>
								{result.equipment_category.name}
							</Text>
							{result.armor_category ? (
								<View>
									<Text style={styles.category}>Armor Category</Text>
									<Text style={styles.infoFont}>
										{Object.values(result.armor_category)}
									</Text>
									<Text style={styles.category}>Base AC</Text>
									<Text style={styles.infoFont}>
										<Text style={styles.infoFont}>
											{result.armor_class.base}
										</Text>
									</Text>
									{result.armor_class.dex_bonus ? (
										<>
											<Text style={styles.category}>Dex Bonus</Text>
											<Text style={styles.infoFont}>
												{result.armor_class.max_bonus}
											</Text>
										</>
									) : null}
								</View>
							) : null}
							{result.desc ? (
								<>
									<Text style={styles.category}>Description</Text>
									<Text style={styles.infoFont}>{result.desc}</Text>
								</>
							) : null}

							{result.damage ? (
								<>
									<Text style={styles.category}>Category/Range</Text>
									<Text style={styles.infoFont}>{result.category_range}</Text>
									<Text style={styles.category}>Damage</Text>
									<Text style={styles.infoFont}>
										{result.damage.damage_dice}
									</Text>
									<Text style={styles.category}>Damage Type</Text>
									<Text style={styles.infoFont}>
										{Object.values(result.damage.damage_type.name)}
									</Text>
									<Text style={styles.category}>Range</Text>
									<Text style={styles.infoFont}>
										{result.range.normal} feet
									</Text>
								</>
							) : null}
							{result.gear_category ? (
								<>
									{result.contents ? (
										<Text style={styles.category}>Contents</Text>
									) : null}
									{result.contents
										? result.contents.map(element => (
												<Text style={styles.infoFont}>
													{element.item.name} - Qauntity: {element.quantity}
												</Text>
										  ))
										: null}
								</>
							) : null}

							<Text style={styles.category}>Cost</Text>
							<Text style={styles.infoFont}>
								{result.cost.quantity} {result.cost.unit}
							</Text>
							<Text style={styles.category}>weight</Text>
							<Text style={styles.infoFont}>{result.weight} pound(s)</Text>

							<Text style={{ marginBottom: 60 }}></Text>
						</View>
					</ScrollView>
				) : (
					<Text>Something went wrong, please go back and try again</Text>
				)}

				<View style={styles.fixedView}>
					<FAB
						style={styles.fabBack}
						icon='arrow-left'
						color='white'
						onPress={() => navigation.navigate('Home')}
					/>
					{/* <FAB
						style={styles.fab}
						icon='plus'
						color='white'
						onPress={() => console.log('Pressed')}
					/> */}
				</View>
			</ImageBackground>
		</>
	);
};

const styles = StyleSheet.create({
	font: {
		fontSize: 50,
		textAlign: 'center',
		marginTop: 50,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoFont: {
		fontSize: 20,
		marginTop: 10,
		alignSelf: 'center',
		margin: 15,
	},
	dndTemplate: {
		height: '100%',
		width: '100%',
	},
	itemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 40,
	},
	category: {
		fontSize: 20,
		marginTop: 10,
		alignSelf: 'center',
		fontWeight: 'bold',
	},
	fixedView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		bottom: 0,
		position: 'absolute',
		width: '100%',
	},
	fab: {
		margin: 16,
		//marginLeft: 'auto',
		alignSelf: 'flex-end',
		backgroundColor: '#2E3438',
	},
	fabBack: {
		margin: 16,
		alignSelf: 'flex-start',
		backgroundColor: '#2E3438',
	},
});

export default EquipmentDetailScreen;
