import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from './ResultsDetail';

const ResultsList = ({ title, navigation, results }) => {
	if (!results) {
		return null;
	}
	return results.map((results, index) => {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				<FlatList
					data={results}
					keyExtractor={results => results.index}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity onPress={() => console.log('pressed')}>
								<ResultsDetail result={item.name} />
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		);
	});
};
const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 15,
		marginBottom: 5,
	},
	container: {
		marginBottom: 10,
		flex: 1,
	},
});

export default ResultsList;
