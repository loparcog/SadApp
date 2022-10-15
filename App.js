import React from 'react';  
import { SafeAreaView, View, Text, Button } from 'react-native';  
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack' 
import { PanGestureHandler } from 'react-native-gesture-handler';

// Home Screen
class HomeScreen extends React.Component {  
    render() {  
        return (  
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text>Home Screen</Text>  
                <Button  
                    title="Go to Feed"  
                    onPress={() => this.props.navigation.navigate('Feed')}  
                />  
            </SafeAreaView>  
        );  
    }  
} 

// Home Functions



// Card Screen
class FeedScreen extends React.Component { 
    
    constructor() {
        super();
        this.state = {
            cardValue: 
            <Text>
                Default Card
            </Text>
        }
    }

    changeCardValue() {
        // Get a random text string
        var val = Math.floor(Math.random() * 1000);
        console.log(val);
        this.setState({
            cardValue:  
            <Text>
                {val}
            </Text>
        });
    }
    
    render() {  
        return (  
            <SafeAreaView 
            onTouchStart={e=> this.touchY = e.nativeEvent.pageY}
            onTouchMove={e => {
                if (this.watchSwipe){
                    if (this.touchY - e.nativeEvent.pageY > 20){
                        console.log('Swiped up');
                        this.changeCardValue();
                        this.watchSwipe = false;
                    }
                    if (this.touchY - e.nativeEvent.pageY < -20){
                        console.log('Swiped down');
                        this.changeCardValue();
                        this.watchSwipe = false;
                    }
                }
            }}
            onTouchEnd={e => {
                this.watchSwipe = true;
            }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "blue" }}>  
                <View style={{width: "80%", height: "80%", backgroundColor: "white", borderRadius: "50px", padding: "10%"}}>
                    {this.state.cardValue}
                </View>
            </SafeAreaView> 
    );  
    }  
}  
  
const AppNavigator = createStackNavigator(  
    {  
        Home: HomeScreen,  
        Feed: FeedScreen  
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