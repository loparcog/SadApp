import React from 'react';  
import { SafeAreaView, Text, Button } from 'react-native';  
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack' 
  
class HomeScreen extends React.Component {  
    render() {  
        return (  
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text>Home Screen</Text>  
                <Button  
                    title="Go to Profile"  
                    onPress={() => this.props.navigation.navigate('Profile')}  
                />  
            </SafeAreaView>  
        );  
    }  
}  
class ProfileScreen extends React.Component {  
    render() {  
        return (  
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>  
                <Text>Profile Screen</Text>  
            </SafeAreaView>  
    );  
    }  
}  
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Profile: ProfileScreen  
    },  
    {  
        initialRouteName: "Home"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
    render() {  
        return <AppContainer />;  
    }  
}  