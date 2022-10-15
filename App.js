import React from 'react';  
import { SafeAreaView, View, Text, Button, Image } from 'react-native';  
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack' 
import NotificationPopup from 'react-native-push-notification-popup';

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
            </Text>,
            watchSwipe: true,
            curr: 0
        }
    }

    createChoiceCard() {
        // Get some choices
        var choiceComp =
            <View>
                <Text style={{textAlign: "center"}}>
                    This is a decision
                </Text>
                <View style={{ flexDirection:"row", alignContent: "center" }}>
                    <View style={{margin: "10%", width: "30%"}}>
                        <Button onPress={this.updateChoiceCard(choiceComp)} title="A"/>
                    </View>
                    <View style={{margin: "10%", width: "30%"}}>
                        <Button onPress={this.updateChoiceCard(choiceComp)} title="B"/>
                    </View>
                </View>
            </View>
        // Set state to this, disallow swiping
        this.setState({
            cardValue: choiceComp
        });
    }

    updateChoiceCard(curr) {
        // Add text to the existing element
        var newChoiceComp = <Text>This is the result</Text>
        console.log("B")

        // Set state and allow scrolling
        this.setState({
            cardValue: newChoiceComp,
            watchSwipe: true
        })
    }

    createPictureCard() {
        // Get some image
        var imageComp = 
            <Image
                style={{width: "90%", height: 'auto'}}
                source={{uri: './assets/stocksad.jpg'}}
            />
        // Set the state to this, enable swiping
        this.setState({
            cardValue: imageComp,
        });
        
    }

    createTextCard() {
        // Get some text
        var textVal = "Being sad is all the rage :("
        // Create a new component
        var textComp = 
            <Text style={{fontSize: 50}}>
                {textVal}
            </Text>
        // Set the state to this, enable swiping
        this.setState({
            cardValue: textComp,
        });
    }

    changeCardValue() {
        // Get a type of window
        if (this.state.curr == 0){
            this.createTextCard()
        }
        else if (this.state.curr == 1){
            this.createPictureCard()
        }
        else if (this.state.curr == 2){
            this.createChoiceCard()
        }

        this.setState({
            curr: this.state.curr + 1
        })
        
    }
    
    render() {  
        return (  
            <SafeAreaView 
            onTouchStart={e=> this.touchY = e.nativeEvent.pageY}
            onTouchMove={e => {
                if (this.state.watchSwipe){
                    if (this.touchY - e.nativeEvent.pageY > 20){
                        console.log('Swiped up');
                        this.changeCardValue();
                        this.setState({
                            watchSwipe: false
                        });
                    }
                    if (this.touchY - e.nativeEvent.pageY < -20){
                        console.log('Swiped down');
                        this.changeCardValue();
                        this.popup.show({
                            appTitle: 'Trauma Trophy',
                            title: 'Doomscroller',
                            body: 'Perform a scroll down!',
                            slideOutTime: 5000
                        });
                        this.setState({
                            watchSwipe: false
                        });
                    }
                }
            }}
            onTouchEnd={e => {this.setState({watchSwipe: true})}}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "blue" }}>  
                <View style={{width: "80%", height: "80%", backgroundColor: "white", borderRadius: "50px", padding: "10%"}}>
                    {this.state.cardValue}
                </View>
                <NotificationPopup ref={ref => this.popup = ref} />
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