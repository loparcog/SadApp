import React from 'react';  
import { SafeAreaView, View, Text, Button, Image } from 'react-native';  
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack' 
import NotificationPopup from 'react-native-push-notification-popup';

// Home Screen
class HomeScreen extends React.Component {  
    render() {  
        const { navigate } = this.props.navigation;

        return (  
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text style={{fontSize: 50}}>Welcome Back!</Text>
                <Image
                    source={require("./assets/lb.png")}
                    style={{width: "90%", height: "35%"}}/>  
                <Button  
                    title="Go to Feed"  
                    onPress={() => navigate('Feed')}
                />  
            </SafeAreaView>  
        );  
    }  
} 


// Card Screen
class FeedScreen extends React.Component { 
    
    constructor() {
        super();
        this.state = {
            cardValue: 
            <Text>
                Default Card
            </Text>,
            choiceResult:
            <Text>
                Default Response
            </Text>,
            watchSwipe: true,
            curr: 0,
            optionChosen: false
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
                        <Button onPress={this.updateChoiceCard.bind(this)} title="A"/>
                    </View>
                    <View style={{margin: "10%", width: "30%"}}>
                        <Button onPress={this.updateChoiceCard.bind(this)} title="B"/>
                    </View>
                </View>
            </View>
        // Set state to this, disallow swiping
        this.setState({
            cardValue: choiceComp,
            choiceResult: <Text style={{textAlign: "center"}}>AAAAA</Text>,
            optionChosen: false
        });
    }

    updateChoiceCard() {
        // Add text to the existing element
        if(!this.state.optionChosen){
            var newChoiceComp = [this.state.cardValue, this.state.choiceResult]

            // Set state and allow scrolling
            this.setState({
                cardValue: newChoiceComp,
                watchSwipe: true,
                optionChosen: true
            })
        }
    }

    createPictureCard() {
        // Get some image
        var imageComp = 
            <Image
                style={{width: "90%", height: "90%"}}
                source={require('./assets/stocksad.jpg')}
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

        var newcurr = this.state.curr + 1
        if (newcurr > 2){
            newcurr = 0;
        }

        this.setState({
            curr: newcurr
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
                <View style={{width: "80%", height: "80%", backgroundColor: "white", borderRadius: 15, overflow: 'hidden', padding: "10%"}}>
                    {this.state.cardValue}
                </View>
                <NotificationPopup ref={ref => this.popup = ref} />
            </SafeAreaView> 
    );  
    }  
}  
  
const AppNavigator = createStackNavigator(  
    {  
        Deprescore: HomeScreen,  
        Feed: FeedScreen  
    },  
    {  
        initialRouteName: "Deprescore"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {  
    render() {  
        return <AppContainer />;  
    }  
}  