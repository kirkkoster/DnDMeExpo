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

const RaceDetailScreen = ({ route, navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const [result, setResults] = useState([]);
	const [spells, setSpells] = useState([]);
	const { id } = route.params;

	useEffect(() => {
		getResult(id);
	}, []);

	const getResult = async id => {
		console.log(id);
		const response = await axios.get(`https://www.dnd5eapi.co/api/races/${id}`);

		const spellGet = await axios.get(
			`https://www.dnd5eapi.co/api/classes/${id}/spells`
		);
		setResults(response.data);
		//setSpells(spellGet);
		setLoaded(true);
	};

	const showSpells = () => {
		if (spells) {
			<Text style={styles.category}>See {result.name} Spells</Text>;
		}
	};
	console.log(result.spellcasting);
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

							<Text style={styles.category}>Movement Speed</Text>
							<Text style={styles.infoFont}>{result.speed} feet</Text>

							<Text style={styles.category}>Size</Text>
							<Text style={styles.infoFont}>{result.size}</Text>

							<Text style={styles.category}>Size Description</Text>
							<Text style={styles.infoFont}>{result.size_description}</Text>

							{result.starting_proficiencies.length > 0 ? (
								<Text style={styles.category}>Proficiencies</Text>
							) : null}
							{result.starting_proficiencies
								? Object.values(result.starting_proficiencies).map(element =>
										element.name ? (
											<Text style={styles.infoFont}>{element.name}</Text>
										) : (
											<Text style={styles.info}>None</Text>
										)
								  )
								: null}

							{result.traits.length > 0 ? (
								<Text style={styles.category}>Traits</Text>
							) : null}
							{result.traits
								? Object.values(result.traits).map(element => (
										<Text style={styles.infoFont}>{element.name}</Text>
								  ))
								: null}
							{result.subraces.length > 0 ? (
								<Text style={styles.category}>Subraces</Text>
							) : null}

							{result.subraces
								? Object.values(result.subraces).map(element => (
										<Text style={styles.infoFont}>{element.name}</Text>
								  ))
								: null}

							<Text style={styles.category}>Bonuses</Text>
							{Object.values(result.ability_bonuses).map(element => (
								<Text style={styles.infoFont}>
									+{element.bonus} to {element.ability_score.name}
								</Text>
							))}

							<Text style={styles.category}>languages</Text>
							{Object.values(result.languages).map(element => (
								<Text style={styles.infoFont}>{element.name}</Text>
							))}

							<Text style={styles.infoFont}>{result.language_desc}</Text>

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

export default RaceDetailScreen;
