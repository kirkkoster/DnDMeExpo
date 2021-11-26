import React from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground,
} from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SigninScreen = ({ navigation }) => {
	return (
		<>
			<ImageBackground
				source={{
					uri: 'https://cdn.shopify.com/s/files/1/0348/4221/4459/products/b1787a2afbbd76693913f982dde1b009_1200x1200.jpg?v=1585679381',
				}}
				resizeMode='cover'
				style={styles.backgroundImage}
				imageStyle={{ opacity: 0.2 }}
			>
				<View style={styles.container}>
					<Text style={styles.titleText}>Sign In</Text>
					<Input
						placeholder='Username'
						placeholderTextColor='black'
						leftIcon={<Icon style={styles.icon} name='user' />}
					/>
					<Input
						placeholder='Password'
						placeholderTextColor='black'
						secureTextEntry={true}
						leftIcon={<Icon style={styles.icon} name='lock' />}
					/>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Home');
						}}
						style={styles.button}
					>
						<Image
							style={styles.imageFlipped}
							source={require('../../assets/dndiconblack.png')}
						/>
						<Text style={styles.imageFont}> Submit </Text>
						<Image
							style={styles.image}
							source={require('../../assets/dndiconblack.png')}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						//style={styles.signUpButton}
						onPress={() => {
							navigation.navigate('Signup');
						}}
					>
						<Text style={styles.signinButton}>Need to sign up?</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 200,
		margin: 10,
	},
	icon: {
		color: 'black',
		fontSize: 24,
		marginRight: 10,
	},
	image: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		marginTop: 5,
	},
	imageFlipped: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		marginTop: 5,
		transform: [{ scaleX: -1 }],
	},
	button: {
		flexDirection: 'row',
		backgroundColor: '#CC3E28',
		borderRadius: 5,
		height: 50,
		justifyContent: 'center',
		marginTop: 10,
		borderWidth: 2,
		borderColor: 'black',
	},
	imageFont: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 30,
		marginTop: 1,
	},
	titleText: {
		fontWeight: 'bold',
		fontSize: 50,
		textAlign: 'center',
		marginBottom: 30,
	},
	backgroundImage: {
		flex: 1,
		justifyContent: 'center',
	},

	signinButton: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 50,
	},
	signUpButton: {
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 2,
		margin: 15,
	},
});

export default SigninScreen;
