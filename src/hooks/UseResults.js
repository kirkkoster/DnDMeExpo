import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';

export default () => {
	const [results, setResults] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const axios = require('axios');

	useEffect(() => {
		searchApi();
	}, []);

	const searchApi = async term => {
		try {
			console.log(term);
			await axios
				.get('https://www.dnd5eapi.co/api/spells/', {
					params: {
						index: term,
						name: term,
					},
				})

				.then(response => {
					const spells = response.data.results;
					setResults(spells);
					console.log(spells);
				});
		} catch (err) {
			setErrorMessage(Alert.alert('something went wrong'));
			console.log(err);
		}
	};

	return [searchApi, results, errorMessage];
};
