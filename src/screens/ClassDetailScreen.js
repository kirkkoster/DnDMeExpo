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

const ClassDetailScreen = ({ route, navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const [result, setResults] = useState([]);
	const [spells, setSpells] = useState([]);
	const { id } = route.params;

	useEffect(() => {
		getResult(id);
	}, []);

	const getResult = async id => {
		const response = await axios.get(
			`https://www.dnd5eapi.co/api/classes/${id}`
		);

		const spellGet = await axios.get(
			`https://www.dnd5eapi.co/api/classes/${id}/spells`
		);
		setResults(response.data);
		setSpells(spellGet);
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
							<Text style={styles.category}>Hit Die</Text>
							<Text style={styles.infoFont}>{result.hit_die}</Text>
							<Text style={styles.category}>Saving Throw</Text>
							{result.saving_throws.map(element => (
								<Text style={styles.infoFont}>{element.name}</Text>
							))}
							<Text style={styles.category}>Proficiencies</Text>
							{Object.values(result.proficiencies).map(element => (
								<Text style={styles.infoFont}>{element.name}</Text>
							))}
							<TouchableOpacity>
								<Text style={styles.infoFont}>{showSpells()}</Text>
							</TouchableOpacity>

							{result.spellcasting
								? Object.values(result.spellcasting.info).map(element => (
										<View>
											<Text style={styles.category}>{element.name}</Text>
											<Text style={styles.infoFont}>{element.desc[0]}</Text>
										</View>
								  ))
								: null}
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

export default ClassDetailScreen;
