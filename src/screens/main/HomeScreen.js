import React from 'react';
import { 
	View, 
	Text, 
	StatusBar, 
	StyleSheet, 
	Button,
	TouchableOpacity 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from './MapScreen';
import UserProfileScreen from './UserProfileScreen';


function MapScreenNav({ navigation }) {
  return (
    <View style={styles.mapScreenView} >
    	<MapScreen navigationProp={navigation} />
    </View>
  );
}

function UserProfileScreenNav({ navigation }) {
  return (
    <View>
    	<UserProfileScreen />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
	return (
	    <NavigationContainer >
	      <Drawer.Navigator initialRouteName="Home">
	        <Drawer.Screen name="Map" component={MapScreenNav} />
	        <Drawer.Screen name="User" component={UserProfileScreenNav} />
	      </Drawer.Navigator>
	    </NavigationContainer>
  	)
}


const styles = StyleSheet.create({
	mapScreenView: {
		height: '100%',
		width: '100%',
		backgroundColor: '#fff'
	}
})

