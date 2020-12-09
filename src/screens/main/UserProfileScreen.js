import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserProfileScreen() {
	return (
	    <View style={styles.mainUserView} >
	      <View style={styles.userAvatarContainer} >
						<View style={styles.userAvatarInitial}>
							<Icon name="person-circle" size={100} style={{marginLeft: 'auto', marginRight: 'auto'}} color={'#eee'} />
						</View>
						

						<View style={styles.userNameContainer}>
								<Text style={styles.userName}>
										Qwerty
								</Text>
						</View>

						<View style={styles.userEmailContainer}>
								<Text style={styles.userEmail}>
										@qwertys
								</Text>
						</View>
				</View>
	    </View>
  	)
}

const styles = StyleSheet.create({
	mainUserView: {
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
		paddingTop: StatusBar.currentHeight
	},
	userAvatarContainer: {
		height: 200,
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
		marginTop: 50
	},
	userAvatarInitial: {
			width: 150,
			height: 100,
			// backgroundColor: '#f4f4f4',
			marginLeft: 'auto',
			marginRight: 'auto',
			justifyContent: 'center',
			alignItems:'center'
	},
	userInital: {
			fontSize: 43,
			fontWeight: '500',
			color: '#333',
			fontFamily: 'sans-serif',
			textTransform: 'capitalize'
	},
	userNameContainer: {
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: 12
	},
	userName: {
			fontFamily: 'sans-serif',
			fontSize: 35,
			fontWeight: '700',
			color: '#333',
			textTransform: 'capitalize'
	},
	userEmailContainer: {
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: 8
	},
	userEmail: {
			fontSize: 14,
			color: '#888'
	},
	userBottomBar: {
		width: 140,
		height: 1,
		backgroundColor: '#eee',
		marginLeft: 'auto',
		marginRight: 'auto',
	}
})

