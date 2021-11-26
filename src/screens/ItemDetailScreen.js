import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-paper';

const ItemDetailScreen = ({ route, navigation }) => {
	const [result, setResults] = useState([]);
	const { id } = route.params;

	const getResult = async id => {
		const response = await axios.get(
			`https://www.dnd5eapi.co/api/spells/${id}`
		);
		setResults(response.data);
	};

	useEffect(() => {
		getResult(id);
	}, []);

	if (!result) {
		return null;
		console.log('it says its empty, captain');
	}
	console.log(result);

	//FLATLIST IS NOT WORKING - TEXT ELEMENTS ARE USED AS PLACEHOLDERS
	return (
		<>
			<ImageBackground
				style={styles.dndTemplate}
				source={require('../../assets/DnDCardTemplate.png')}
			>
				<ScrollView>
					<View style={styles.container}>
						{/* <TouchableOpacity
							title='Back'
							onPress={() => navigation.navigate('Home')}
							style={styles.backButton}
						>
							<Text>Go Back</Text>
						</TouchableOpacity> */}
						<Text style={styles.font}>{result.name}</Text>
						<Text style={styles.category}>Description</Text>
						<Text style={styles.infoFont}>{result.desc}</Text>
						{/* <Text style={styles.category}>Damage</Text>
						<Text style={styles.infoFont}>
							{JSON.stringify(result.damage.damage_at_slot_level)}
						</Text> */}
						<Text style={styles.category}>Range</Text>
						<Text style={styles.infoFont}>{result.range}</Text>
						<Text style={styles.category}>Duration</Text>
						<Text style={styles.infoFont}>{result.duration}</Text>
						<Text style={styles.category}>Concentration</Text>
						<Text style={styles.infoFont}>{String(result.concentration)}</Text>
						<Text style={styles.category}>Level</Text>
						<Text style={styles.infoFont}>{result.level}</Text>

						{/* <FlatList
					data={result}
					keyExtractor={result.url}
					renderItem={({ item }) => {
						return (
							<ImageBackground
								style={styles.dndTemplate}
								imageStyle={{ borderRadius: 9 }}
								source={require('../../assets/DnDCardTemplate.png')}
							>
								<Text style={styles.itemTitle}>{item.name}</Text>
								<Text>{item.desc}</Text>
							</ImageBackground>
						);
					}}
				/> */}
					</View>
				</ScrollView>
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

export default ItemDetailScreen;
