import React from 'react';
import { 
	View, 
	Text, 
	StatusBar, 
	StyleSheet, 
	Button, 
	PermissionsAndroid, 
	Alert,
	TouchableOpacity,
	TouchableNativeFeedback,
	LogBox,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import AccessToken from './AccessToken';
import LinearGradient from 'react-native-linear-gradient';



MapboxGL.setAccessToken(AccessToken);
LogBox.ignoreAllLogs();


export default class MapScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  coordinates: [ -73.9963, 40.6943 ],
		};
	}

	async requestLocationPermission() {
		const checkLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
		if (checkLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
			alert("You've access for the location");
		} else {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						'title': 'App requires Location permission',
						'message': 'We required Location permission in order to show nearby restaurants '
					}
				)
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					Geolocation.getCurrentPosition(
						(position) => {
							console.log(position.coords.longitude, position.coords.latitude);
							this.setState({ coordinates: [position.coords.longitude, position.coords.latitude] })
						},
						(error) => {
							console.log(error.message);
						},
						{  enableHighAccuracy: true, timeout: 15000, maximumAge: 10000  }
						);
				} else {
					alert("You don't have access for the location");
				}
			} catch (err) {
				alert(err)
			}
		}
	};


	render() {
		return (
			<View style={styles.mainMapScreenView}>
				<StatusBar translucent backgroundColor="#ffffff00" barStyle="dark-content" />

				{/* <LinearGradient style={styles.mainMapScreenViewControlButtonsView} colors={['#fff', '#ffffffcb', '#ffffff85', '#ffffff3a', '#ffffff00']}> */}
				<LinearGradient style={styles.mainMapScreenViewControlButtonsView} colors={['#ffffff00', '#ffffff00']}>
					<View style={styles.mainMapScreenViewToggleSideDrawerView}>
						<TouchableOpacity style={styles.mainMapScreenViewToggleSideDrawerViewButton} onPress={() => this.props.navigationProp.openDrawer()} >
							<Icon 
								name="menu" 
								size={25} 
								color={'#6e6e6e'}  
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.mainMapScreenViewSeeNearbyYouView}>
						<TouchableOpacity style={styles.mainMapScreenViewSeeNearbyYouViewButton} onPress={() => this.requestLocationPermission()} >
							<Icon 
								name="compass" 
								size={20} 
								color={'#0077ff'} 
							/>
							<Text style={styles.mainMapScreenViewSeeNearbyYouViewButtonText}>
								Explore Nearby
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.mainMapScreenViewWeatherView}>
						<View style={styles.mainMapScreenViewWeatherViewButton}>
							<Icon 
								name="sunny-outline" 
								size={20} 
								color={'#6e6e6e'} 
								style={{marginRight: 4}} 
							/>
							<Text style={styles.mainMapScreenViewWeatherViewButtonText} >
								23°
							</Text>
						</View>
					</View>
				</LinearGradient>

				<View style={styles.container}>
					<MapboxGL.MapView 
						logoEnabled={false} 
						style={styles.map}
						attributionEnabled={false} 
						styleURL={"mapbox://styles/mechanic-fix-things/ckidhj9ms0r9c19quj8qv98kq"}
						>
						<MapboxGL.Camera
							zoomLevel={15}
							centerCoordinate={this.state.coordinates} />
						
						<View>
							<MapboxGL.PointAnnotation id={"the"} title="Test" coordinate={this.state.coordinates} >
								<Icon name="ellipse" size={40} color={'#FFD232'} />
							</MapboxGL.PointAnnotation>
						</View>
					</MapboxGL.MapView>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	mainMapScreenView: {
		height: '100%',
		width: '100%',
	},
	mainMapScreenViewControlButtonsView: {
		height: 120,
		width: '100%',
		marginTop: StatusBar.currentHeight,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		// backgroundColor: 'red',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 2
	},
	mainMapScreenViewToggleSideDrawerView: {
		height: '65%',
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainMapScreenViewSeeNearbyYouView: {
		height: '65%',
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainMapScreenViewWeatherView: {
		height: '65%',
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainMapScreenViewSeeNearbyYouViewButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		width: 150,
		paddingTop: 10,
		paddingBottom: 10,
		elevation: 5,
		borderRadius: 10
	},
	mainMapScreenViewSeeNearbyYouViewButtonText: {
		marginLeft: 8,
		fontSize: 13,
		color: '#6e6e6e',
		fontWeight: '700'
	},
	mainMapScreenViewToggleSideDrawerViewButton: {
		height: 48,
		width: 48,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		borderRadius: 10
	},
	mainMapScreenViewWeatherViewButton: {
		backgroundColor: '#ffffffc7',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		paddingBottom: 6,
		borderRadius: 30,
		// elevation: 5
	},
	mainMapScreenViewWeatherViewButtonText: {
		fontSize: 13,
		color: '#4e4e4e',
		fontWeight: '700'
	},
	container: {
		height: '100%',
		width: '100%',
	},
	map: {
		flex: 1,
	},
})

