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
	Alert,
} from 'react-native';
import { FAB } from 'react-native-paper';

const SpellDetailScreen = ({ route, navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const [result, setResults] = useState([]);
	const [damage, setDamage] = useState([]);
	const { id } = route.params;

	const getResult = async id => {
		const response = await axios.get(
			`https://www.dnd5eapi.co/api/spells/${id}`
		);
		setResults(response.data);
		setDamage(response.data.damage);
		setLoaded(true);
	};

	useEffect(() => {
		getResult(id);
	}, []);

	return (
		<ImageBackground
			style={styles.dndTemplate}
			source={require('../../assets/DnDCardTemplate.png')}
		>
			{loaded ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.container}>
						<Text style={styles.font}>{result.name}</Text>
						<Text style={styles.category}>Class</Text>
						{result.classes.map(element => (
							<Text style={styles.infoFont}>{element.name}</Text>
						))}
						<Text style={styles.category}>Range</Text>
						<Text style={styles.infoFont}>{result.range}</Text>
						<Text style={styles.category}>Duration</Text>
						<Text style={styles.infoFont}>{result.duration}</Text>
						<Text style={styles.category}>Concentration</Text>
						<Text style={styles.infoFont}>{String(result.concentration)}</Text>
						<Text style={styles.category}>Level</Text>
						<Text style={styles.infoFont}>{result.level}</Text>

						{damage ? (
							<>
								<Text style={styles.category}>Damage Type</Text>
								<Text style={styles.infoFont}>{damage.damage_type.name}</Text>
								{damage.higher_level ? (
									<>
										<Text style={styles.category}>Damage At Higher Level</Text>
										<Text style={styles.infoFont}>{result.higher_level}</Text>
									</>
								) : null}

								{damage.damage_at_slot_level ? (
									<Text style={styles.category}>Damage Dice Per Level</Text>
								) : null}

								{damage.damage_at_slot_level ? (
									Object.entries(damage.damage_at_slot_level).map(element => (
										<Text style={styles.infoFont}>
											Level {element[0]}: {element[1]}
										</Text>
									))
								) : (
									<>
										<Text style={styles.category}>Spell Type</Text>
										<Text style={styles.infoFont}>Cantrip</Text>
									</>
								)}
							</>
						) : null}

						<Text style={styles.category}>Description</Text>
						<Text style={styles.infoFont}>{result.desc}</Text>
					</View>
				</ScrollView>
			) : null}

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

export default SpellDetailScreen;
