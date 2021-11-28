import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createSwitchNavigator } from 'react-navigation';
import { ImageBackground, View } from 'react-native';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen.js';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import SpellDetailScreen from './src/screens/SpellDetailScreen';
import ClassDetailScreen from './src/screens/ClassDetailScreen';
import SaveScreen from './src/screens/SaveScreen';
import RaceDetailScreen from './src/screens/RaceDetailScreen';
import SubRaceDetailScreen from './src/screens/SubRaceDetailScreen';
import FeatsDetailScreen from './src/screens/FeatsDetailScreen';
import EquipmentDetailScreen from './src/screens/EquipmentDetailScreen';
import MagicItemDetailScreen from './src/screens/MagicItemDetailScreen';
import { AdMobBanner } from 'expo-ads-admob';
import Constants from 'expo-constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const onFailToRecieveAd = error => console.log(error);
const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-3701578112584567/7661588394';

const adUnitID = Platform.select({
	ios: 'ca-app-pub-3701578112584567/7661588394',
	android: 'ca-app-pub-3701578112584567/9890583331',
});

// expo build:android -t app-bundle // SUCCESSFUL BUILD LINE I USED LAST

const MyTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarBackground: () => (
					<ImageBackground
						style={{ height: '100%', width: '100%' }}
						source={require('./assets/DnDCardTemplate.png')}
					/>
				),
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home';
					} else if (route.name === 'Library') {
						iconName = focused ? 'bookshelf' : 'bookshelf';
					}

					return (
						<MaterialCommunityIcons name={iconName} size={size} color={color} />
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: 'black',
				inactiveTintColor: 'gray',
			}}
		>
			<Tab.Screen name='Home' component={HomeScreen} />
			<Tab.Screen name='Library' component={SaveScreen} />
		</Tab.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen
					name='SpellDetail'
					component={SpellDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='ItemDetail'
					component={ItemDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='ClassDetail'
					component={ClassDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='RaceDetail'
					component={RaceDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='SubRaceDetail'
					component={SubRaceDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='EquipmentDetail'
					component={EquipmentDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='FeatsDetail'
					component={FeatsDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='MagicItemDetail'
					component={MagicItemDetailScreen}
					options={{ title: '', headerShown: false }}
				/>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ title: '', headerShown: false }}
				/>
			</Stack.Navigator>
			<View>
				{/* <AdMobBanner
					adSize='largeBanner'
					adUnitID='ca-app-pub-3701578112584567/7661588394'
					testDeviceID='ca-app-pub-3940256099942544/2934735716'
					didFailToReceiveAdWithError={onFailToRecieveAd}
				/> */}
				{/* <AdMobBanner
					style={{ alignItems: 'center' }}
					bannerSize='smartBannerPortrait'
					adUnitID={testID} // for testing use testID // for production use productionID
					servePersonalizedAds // true or false
					onDidFailToReceiveAdWithError={this.bannerError}
				/> */}
				<AdMobBanner
					adUnitID={testID} // for testing use testID // for production use adUnitID
					bannerSize='smartBannerPortrait'
					servePersonalizedAds={true}
					style={{
						padding: 10,
					}}
				/>
			</View>
		</NavigationContainer>
	);
};

export default App;
