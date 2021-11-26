import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	TouchableOpacity,
	Image,
	ImageBackground,
	Switch,
	Alert,
	TouchableHighlight,
	Pressable,
} from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
	const axios = require('axios');
	const [term, setTerm] = useState('');
	const [result, setResult] = useState([]);
	const [spellsEnabled, setSpellsEnabled] = useState(true); //default param
	const [classEnabled, setClassEnabled] = useState(false);
	const [raceEnabled, setRaceEnabled] = useState(false);
	const [subRaceEnabled, setSubRaceEnabled] = useState(false);
	const [magicItemEnabled, setMagicItemEnabled] = useState(false);
	const [equipmentEnabled, setEquipmentEnabled] = useState(false);
	const [error, setError] = useState();
	const toggleSpells = () => {
		setSpellsEnabled(previousState => !previousState);
		setClassEnabled(false);
		setRaceEnabled(false);
		setSubRaceEnabled(false);
		setEquipmentEnabled(false);
		setMagicItemEnabled(false);
		setResult([]);
	};
	const toggleClass = () => {
		setClassEnabled(previousState => !previousState);
		setSpellsEnabled(false);
		setRaceEnabled(false);
		setSubRaceEnabled(false);
		setEquipmentEnabled(false);
		setMagicItemEnabled(false);
		setResult([]);
	};
	const toggleRace = () => {
		setRaceEnabled(previousState => !previousState);
		setSpellsEnabled(false);
		setClassEnabled(false);
		setSubRaceEnabled(false);
		setEquipmentEnabled(false);
		setMagicItemEnabled(false);
		setResult([]);
	};
	const toggleSubrace = () => {
		setSubRaceEnabled(previousState => !previousState);
		setSpellsEnabled(false);
		setClassEnabled(false);
		setEquipmentEnabled(false);
		setRaceEnabled(false);
		setMagicItemEnabled(false);
		setResult([]);
	};
	const toggleMagicItem = () => {
		setMagicItemEnabled(previousState => !previousState);
		setSpellsEnabled(false);
		setClassEnabled(false);
		setSubRaceEnabled(false);
		setEquipmentEnabled(false);
		setRaceEnabled(false);
		setResult([]);
	};
	const toggleEquipment = () => {
		setEquipmentEnabled(previousState => !previousState);
		setSpellsEnabled(false);
		setClassEnabled(false);
		setSubRaceEnabled(false);
		setRaceEnabled(false);
		setMagicItemEnabled(false);
		setResult([]);
	};

	const baseURL = 'https://www.dnd5eapi.co/api/';

	const navigateDetail = id => {
		if (spellsEnabled) {
			navigation.navigate('SpellDetail', id);
		}
		if (classEnabled) {
			navigation.navigate('ClassDetail', id);
		}
		if (raceEnabled) {
			navigation.navigate('RaceDetail', id);
		}
		if (subRaceEnabled) {
			navigation.navigate('SubRaceDetail', id);
		}
		if (magicItemEnabled) {
			navigation.navigate('MagicItemDetail', id);
		}
		if (equipmentEnabled) {
			navigation.navigate('EquipmentDetail', id);
		}
	};

	const getResults = () => {
		if (spellsEnabled) {
			getSpells(term.replace(/ /g, ''));
		}
		if (classEnabled) {
			getClasses(term.replace(/ /g, ''));
		}
		if (raceEnabled) {
			getRaces(term.replace(/ /g, ''));
		}
		if (subRaceEnabled) {
			getSubRaces(term.replace(/ /g, ''));
		}
		if (equipmentEnabled) {
			getEquipment(term.replace(/ /g, ''));
		}
		if (magicItemEnabled) {
			getMagicItem(term.replace(/ /g, ''));
		} else if (
			!spellsEnabled &&
			!classEnabled &&
			!raceEnabled &&
			!equipmentEnabled &&
			!magicItemEnabled &&
			!subRaceEnabled
		) {
			return setError(Alert.alert('Please select a filter'));
		}
	};

	const getSpells = async term => {
		await axios
			.get(baseURL + 'spells/', {
				params: {
					index: term,
					name: term,
				},
			})

			.then(response => {
				const spells = response.data.results;
				setResult(spells);
			})
			.catch(error => console.error(`Error: ${error}`));
	};
	const getClasses = async term => {
		await axios
			.get(baseURL + 'classes/', {
				params: {
					index: term,
					name: term,
				},
			})

			.then(response => {
				const spells = response.data.results;
				setResult(spells);
			})
			.catch(error => console.error(`Error: ${error}`));
	};
	const getRaces = async term => {
		await axios
			.get(baseURL + 'races/', {
				params: {
					index: term,
					name: term,
				},
			})

			.then(response => {
				const spells = response.data.results;
				setResult(spells);
			})
			.catch(error => console.error(`Error: ${error}`));
	};
	const getSubRaces = async term => {
		await axios
			.get(baseURL + 'subraces/', {
				params: {
					index: term,
					name: term,
				},
			})

			.then(response => {
				const subraces = response.data.results;
				setResult(subraces);
			})
			.catch(error => console.error(`Error: ${error}`));
	};
	const getEquipment = async term => {
		await axios
			.get(baseURL + 'equipment/', {
				params: {
					index: term,
					name: term,
				},
			})

			.then(response => {
				const equipment = response.data.results;
				setResult(equipment);
			})
			.catch(error => console.error(`Error: ${error}`));
	};
	const getMagicItem = async term => {
		await axios
			.get(baseURL + 'magic-items/', {
				params: {
					index: term,
					name: term,
				},
			})

			.then(response => {
				const magicItem = response.data.results;
				setResult(magicItem);
			})
			.catch(error => console.error(`Error: ${error}`));
	};

	return (
		<>
			<View style={styles.searchBar}>
				<Feather style={styles.iconStyle} name='search' />
				<TextInput
					autoCapitalize='none'
					autoCorrect={false}
					style={styles.inputStyle}
					placeholder='Search'
					value={term}
					onChangeText={setTerm}
					onSubmitEditing={() => getResults(term)}
				/>
				<TouchableOpacity onPress={() => setTerm('')}>
					<MaterialCommunityIcons
						name='close-circle'
						size={24}
						color='gray'
						style={styles.clearText}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<View style={styles.checkboxContainer}>
					<View style={styles.filterViewTop}>
						<TouchableOpacity onPress={toggleSpells}>
							{spellsEnabled ? (
								<Text style={styles.toggledText}> Spells </Text>
							) : (
								<Text style={styles.unToggledText}> Spells </Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleClass}>
							{classEnabled ? (
								<Text style={styles.toggledText}> Classes </Text>
							) : (
								<Text style={styles.unToggledText}> Classes </Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleMagicItem}>
							{magicItemEnabled ? (
								<Text style={styles.toggledText}> Magic Items </Text>
							) : (
								<Text style={styles.unToggledText}> Magic Items </Text>
							)}
						</TouchableOpacity>
					</View>
					<View style={styles.filterViewBottom}>
						<TouchableOpacity onPress={toggleEquipment}>
							{equipmentEnabled ? (
								<Text style={styles.toggledText}> Equipment </Text>
							) : (
								<Text style={styles.unToggledText}> Equipment </Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleRace}>
							{raceEnabled ? (
								<Text style={styles.toggledText}> Races </Text>
							) : (
								<Text style={styles.unToggledText}> Races </Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleSubrace}>
							{subRaceEnabled ? (
								<Text style={styles.toggledText}> Subraces </Text>
							) : (
								<Text style={styles.unToggledText}> Subraces </Text>
							)}
						</TouchableOpacity>
					</View>
					{result > [] ? (
						<TouchableOpacity
							style={styles.clearFilterButton}
							onPress={() => setResult('')}
						>
							<Text style={styles.clearFilter}>Clear Results</Text>
						</TouchableOpacity>
					) : null}
				</View>

				<FlatList
					data={result}
					key={result.url}
					renderItem={({ item }) => {
						return (
							<View
								style={{
									alignItems: 'stretch',
									marginRight: 15,
									marginLeft: 15,
									marginBottom: 10,
								}}
							>
								<TouchableOpacity
									onPress={() => navigateDetail({ id: item.index })}
								>
									<ImageBackground
										style={styles.dndTemplate}
										imageStyle={{ borderRadius: 9 }}
										source={require('../../assets/DnDCardTemplate.png')}
									>
										<Text style={styles.itemTitle}>{item.name}</Text>
										{/* <FAB
											style={styles.fab}
											icon='plus'
											color='black'
											onPress={() => {
												Alert.alert(
													'Hey! You Pressed It!',
													"Since this is in beta, I haven't gotten around to implementing the save functionality yet. Sorry!"
												);
											}}
										/> */}
									</ImageBackground>
								</TouchableOpacity>
							</View>
						);
					}}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontSize: 50,
	},
	filterViewTop: {
		flexDirection: 'row',
	},
	filterViewBottom: {
		flexDirection: 'row',
		marginBottom: 5,
	},
	inputStyle: {
		flex: 1,
		fontSize: 25,
	},
	iconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginHorizontal: 15,
	},
	searchBar: {
		backgroundColor: '#EBEBEB',
		height: 50,
		borderRadius: 10,
		marginHorizontal: 15,
		flexDirection: 'row',
		marginTop: 100,
		marginBottom: 10,
	},
	dndTemplate: {
		height: 100,
		width: '100%',
	},
	itemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 40,
		textAlign: 'center',
	},
	checkbox: {
		alignSelf: 'center',
	},
	checkboxContainer: {
		marginRight: 10,
		marginLeft: 10,
		alignItems: 'center',
	},
	checkboxContainerTwo: {
		flexDirection: 'row',
		marginRight: 10,
		marginLeft: 10,
		marginTop: 10,
		alignItems: 'center',
	},
	checkboxFont: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	toggledText: {
		fontSize: 26,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 10,
	},
	unToggledText: {
		fontSize: 18,
		textAlign: 'center',
		padding: 10,
	},
	parameterFont: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	clearFilter: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	clearFilterButton: {
		borderWidth: 5,
		backgroundColor: '#E5DCE5',
		borderColor: '#E5DCE5',
		borderRadius: 5,
		marginBottom: 5,
	},
	fab: {
		position: 'absolute',
		margin: 0,
		bottom: 23,
		right: 15,
		backgroundColor: null,
		elevation: 0,
	},
	filterButton: {
		height: 100,
		width: 100,
	},
	clearText: {
		position: 'relative',
		margin: 13,
	},
});

export default HomeScreen;
