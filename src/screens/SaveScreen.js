import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveScreen = ({ route, navigation }) => {
	const [stored, setStored] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem(itemName);

			if (value !== null) {
				console.log(value);
				setStored(value);
			}
		} catch (e) {
			console.log('error reading value');
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.font}>Saving Items Coming Later</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	font: {
		textAlign: 'center',
	},
});

export default SaveScreen;
