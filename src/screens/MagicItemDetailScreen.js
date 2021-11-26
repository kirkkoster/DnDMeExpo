import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	ScrollView,
} from 'react-native';
import { FAB } from 'react-native-paper';

const MagicItemDetailScreen = ({ route, navigation }) => {
	const [loaded, setLoaded] = useState(false);
	const [result, setResults] = useState([]);
	const { id } = route.params;

	useEffect(() => {
		getResult(id);
	}, []);

	const getResult = async id => {
		const response = await axios.get(
			`https://www.dnd5eapi.co/api/magic-items/${id}`
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
							<Text style={styles.infoFont}>{result.desc[0]}</Text>
							<Text style={styles.infoFont}>{result.desc[1]}</Text>
							<Text style={styles.infoFont}>{result.desc[2]}</Text>
							<Text style={styles.infoFont}>{result.desc[3]}</Text>
							<Text style={styles.infoFont}>{result.desc[4]}</Text>
							<Text style={styles.infoFont}>{result.desc[5]}</Text>
							<Text style={styles.infoFont}>{result.desc[6]}</Text>
							<Text style={styles.infoFont}>{result.desc[7]}</Text>
							<Text style={styles.infoFont}>{result.desc[8]}</Text>
							<Text style={styles.infoFont}>{result.desc[9]}</Text>
							<Text style={styles.infoFont}>{result.desc[10]}</Text>
							<Text style={styles.infoFont}>{result.desc[11]}</Text>
							<Text style={styles.infoFont}>{result.desc[12]}</Text>
							<Text style={styles.infoFont}>{result.desc[13]}</Text>
							<Text style={styles.infoFont}>{result.desc[14]}</Text>
							<Text style={styles.infoFont}>{result.desc[15]}</Text>
							<Text style={styles.infoFont}>{result.desc[16]}</Text>
							<Text style={styles.infoFont}>{result.desc[17]}</Text>
							<Text style={styles.infoFont}>{result.desc[18]}</Text>
							<Text style={styles.infoFont}>{result.desc[19]}</Text>
							<Text style={styles.infoFont}>{result.desc[20]}</Text>
							<Text style={styles.infoFont}>{result.desc[21]}</Text>
							<Text style={styles.infoFont}>{result.desc[22]}</Text>
							<Text style={styles.infoFont}>{result.desc[23]}</Text>
							<Text style={styles.infoFont}>{result.desc[24]}</Text>
							<Text style={styles.infoFont}>{result.desc[25]}</Text>
							<Text style={styles.infoFont}>{result.desc[26]}</Text>
							<Text style={styles.infoFont}>{result.desc[27]}</Text>
							<Text style={styles.infoFont}>{result.desc[28]}</Text>
							<Text style={styles.infoFont}>{result.desc[29]}</Text>
							<Text style={styles.infoFont}>{result.desc[30]}</Text>
							<Text style={styles.infoFont}>{result.desc[31]}</Text>
							<Text style={styles.infoFont}>{result.desc[32]}</Text>
							<Text style={styles.infoFont}>{result.desc[33]}</Text>
							<Text style={styles.infoFont}>{result.desc[34]}</Text>
							<Text style={styles.infoFont}>{result.desc[35]}</Text>
							<Text style={styles.infoFont}>{result.desc[36]}</Text>
							<Text style={styles.infoFont}>{result.desc[37]}</Text>
							<Text style={styles.infoFont}>{result.desc[38]}</Text>
							<Text style={styles.infoFont}>{result.desc[39]}</Text>
							<Text style={styles.infoFont}>{result.desc[40]}</Text>
							<Text style={styles.infoFont}>{result.desc[41]}</Text>
							<Text style={styles.infoFont}>{result.desc[42]}</Text>
							<Text style={styles.infoFont}>{result.desc[43]}</Text>
							<Text style={styles.infoFont}>{result.desc[44]}</Text>
							<Text style={{ marginBottom: 60 }}></Text>
						</View>
					</ScrollView>
				) : null}

				<View style={styles.fixedView}>
					{/* <FAB
						style={styles.fab}
						icon='plus'
						color='white'
						onPress={() => console.log('Pressed')}
					/> */}
					<FAB
						style={styles.fabBack}
						icon='arrow-left'
						color='white'
						onPress={() => navigation.navigate('Home')}
					/>
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

export default MagicItemDetailScreen;
