import axios from 'axios';
import React, { useState, useEffect, ScrollView } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ImageBackground,
} from 'react-native';

const AccountScreen = ({ route, navigation }) => {
	return (
		<View style={styles.container}>
			<Text>Account Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	font: {
		fontSize: 50,
		alignSelf: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 10,
	},
	infoFont: {
		fontSize: 20,
		marginTop: 10,
	},
	dndTemplate: {
		height: '100%',
		width: 400,
		margin: 10,
	},
	itemTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 40,
	},
});

export default AccountScreen;
