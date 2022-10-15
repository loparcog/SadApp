import React from 'react';  
import { SafeAreaView, View, Text, Button, Image, ImageBackground } from 'react-native';  
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack' 
import NotificationPopup from 'react-native-push-notification-popup';

// Home Screen
class HomeScreen extends React.Component {  
    render() {  
        const { navigate } = this.props.navigation;

        return (  
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <ImageBackground source={require('./assets/background-for-sadapp-2.gif')}  
                style={{width: "100%", height: "100%", resizeMode: "cover", flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 20, width: "70%", backgroundColor: "black", borderRadius: 20, overflow: 'hidden'
                    , margin: 20, color: "white", padding: 10, textAlign: 'center', opacity: 0.8}}>Get those points while your psyche can still handle it!</Text>

                <Text style={{fontSize: 15, width: "70%", backgroundColor: "black", borderRadius: 20, overflow: 'hidden'
                    , margin: 20, color: "white", padding: 10, textAlign: 'center', opacity: 0.8}}>Lethargic Leaderboard</Text>
                <Image
                    source={require("./assets/lb_new.png")}
                    style={{width: "90%", height: "35%", padding: "-50%", borderRadius: 10}}/>
                <View style={{ opacity: 1, backgroundColor: "black", borderRadius: 20, margin: 50, width: "40%"}}>
                        <Button  
                        title="Frown Feed :("  
                        onPress={() => navigate('Feed')}
                        color="yellow"
                        style={{}}/>  
                    </View>

                    <View style={{ opacity: 1, backgroundColor: "black", borderRadius: 20, margin: 50, width: "40%"}}>
                        <Button  
                        title="Trophies :)" 
                        color="yellow"
                        style={{}}/>  
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );  
    }  
} 


// Card Screen
class FeedScreen extends React.Component { 
    
    constructor() {
        super();
        this.state = {
            // Value to display on the card
            cardValue: 
            <Text style={{fontSize: 40}}>
                Even if you are one in a million, there are still 7,700 others like you!
            </Text>,
            // Variables to manage swiping
            watchSwipe: true,
            optionChosen: true,
            // Tracking current card index for each option
            currCard: 0,
            currChoice: 0,
            currPhoto: 0,
            currText: 0
        }
    }

    // Create lists for each type of card
    // 0 > Text, 1 > Photo, 2 > Choice
    cardList = [0,1,2,0,1,0,2,0,1,0,2];
    choiceListQ = ["Someone is being bullied at school or work, do you...", "Do you prefer coffee or tea?", "Do you flush every time you pee?"];
    choiceListC1 = ["Intervene", "Tea", "Yes"];
    choiceListC2 = ["Stand By", "Coffee", "No"];
    choiceListA1 = ["You've involved yourself, and there's no going back. You're now being bullied along with the original target. Maybe one of their dads owns a Subway franchise, and can use his power to retaliate against you. Nice going...",
    "Did you know that tea production is directly contributing to deforestation?Farmers clear vast amounts of forest to make room for tea plantations, and as a result seriously affect the surrounding ecosystem. Today forests cover 30% of the Earth's land area, but this total is rapidly decreasing.",
    "Did you know most people pee 6 or 7 times a day, so if you flushed every time and each flush used 9 gallons, that could mean using around 60 gallons of water every day just to flush. Wow, what a waste."];
    choiceListA2 = ["You're a bystander, and are effectively as bad as the bullies. Your cowardice is on full display, but at least you can crawl back to your hovel and curl up in a ball.",
    "Did you know that coffee production is altering rainforest ecosystems which negatively affect plant and animal species living within. Worldwide, the use of monocrop coffee production is leading to deforestation, soil erosion, and water pollution.",
    "That’s kind of gross. No one wants to see/smell your dehydrated piss. You should be ashamed."];
    textList = ["Not everything is a lesson. Sometimes you just fail",
        "Every dead body on Mt. Everest was once a highly motivated person, so maybe calm down.",
        "Today is the first day of the rest of your life. But so was yesterday, and look how that turned out",
        "It could be that your purpose in life is to serve as a warning to others",
        "Those who doubt your ability probably have a valid reason",
        "The best things in life are actually really expensive"];

    createChoiceCard() {
        // Get some choices
        var choiceComp =
            <View key="Q">
                <Text style={{textAlign: "center", fontSize: 30}}>
                    {this.choiceListQ[this.state.currChoice]}
                </Text>
                <View style={{ flexDirection:"row", alignContent: "center"}}>
                    <View style={{width: "40%", alignContent:'center'}}>
                        <Button onPress={this.updateChoiceCard1.bind(this)} title={this.choiceListC1[this.state.currChoice]}/>
                    </View>
                    <View style={{width: "40%", alignItems: 'center'}}>
                        <Button onPress={this.updateChoiceCard2.bind(this)} title={this.choiceListC2[this.state.currChoice]}/>
                    </View>
                </View>
            </View>
        // Set state to this, disallow swiping
        this.setState({
            cardValue: choiceComp,
            optionChosen: false
        });
    }

    updateChoiceCard1() {
        // Add text to the existing element
        if(!this.state.optionChosen){
            var newChoiceComp = [this.state.cardValue, 
                <Text key="A" style={{textAlign: "center"}}>{this.choiceListA1[this.state.currChoice]}</Text>]

            // Set state and allow scrolling
            this.setState({
                cardValue: newChoiceComp,
                watchSwipe: true,
                optionChosen: true
            })
        }
    }

    updateChoiceCard2() {
        // Add text to the existing element
        if(!this.state.optionChosen){
            console.log(this.choiceListA2[this.state.currChoice])
            var newChoiceComp = [this.state.cardValue, 
                <Text key="A" style={{textAlign: "center"}}>{this.choiceListA2[this.state.currChoice]}</Text>]

            // Set state and allow scrolling
            this.setState({
                cardValue: newChoiceComp,
                watchSwipe: true,
                optionChosen: true,
                currChoice: this.state.currChoice + 1
            })
        }
    }

    createPictureCard() {
        // Get some image
        if (this.state.currPhoto == 0){
            var imageComp = 
                <Image
                    style={{width: "100%", height: undefined, aspectRatio: 1}}
                    source={require('./assets/saddog.png')}
                />
        } else if (this.state.currPhoto == 1){
            var imageComp = 
                <Image
                    style={{width: "100%", height: undefined, aspectRatio: 1}}
                    source={require('./assets/mike.png')}
                />
        } else {
            var imageComp = 
                <Image
                    style={{width: "100%", height: undefined, aspectRatio: 1}}
                    source={require('./assets/spot.png')}
                />
        }
        // Set the state to this, enable swiping
        this.setState({
            cardValue: imageComp,
        });
        
    }

    createTextCard() {
        // Create a new component
        var textComp = 
            <Text style={{fontSize: 40}}>
                {this.textList[this.state.currText]}
            </Text>
        // Set the state to this, enable swiping
        this.setState({
            cardValue: textComp,
        });
    }

    changeCardValue() {
        // Get a type of window
        var cardIndex = this.cardList[this.state.currCard]
        if (cardIndex == 0){
            this.createTextCard()
            this.setState({
                currCard: this.state.currCard + 1,
                currText: this.state.currText + 1
            })
        }
        else if (cardIndex == 1){
            this.createPictureCard()
            this.setState({
                currCard: this.state.currCard + 1,
                currPhoto: this.state.currPhoto + 1
            })
        }
        else if (cardIndex == 2){
            this.createChoiceCard()
            this.setState({
                currCard: this.state.currCard + 1,
                //currChoice: this.state.currChoice + 1
            })
        }
    }
    
    render() {  
        return (  
            <SafeAreaView 
            onTouchStart={e=> this.touchY = e.nativeEvent.pageY}
            onTouchMove={e => {
                if (this.state.watchSwipe && this.state.optionChosen){
                    if (this.touchY - e.nativeEvent.pageY > 20){
                        console.log('Swiped up');
                        this.changeCardValue();
                        this.setState({
                            watchSwipe: false
                        });
                    }
                    if (this.touchY - e.nativeEvent.pageY < -20){
                        console.log('Swiped down');
                        //this.changeCardValue();
                        this.popup.show({
                            appTitle: 'Trauma Trophy Achieved!',
                            appIconSource: require('./assets/trophy.png'),
                            title: 'Doomscroller',
                            body: 'Perform a scroll down!',
                            slideOutTime: 3000
                        });
                        this.setState({
                            watchSwipe: false
                        });
                    }
                }
            }}
            onTouchEnd={e => {this.setState({watchSwipe: true})}}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "yellow" }}>  
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