import React from 'react';
import { Switch, StyleSheet,ScrollView, View, Text,BackHandler, TouchableOpacity } from 'react-native';
import {Card,Checkbox} from 'react-native-paper';
import TimePicker from 'react-native-simple-time-picker';
import RNLocalNotifications from 'react-native-local-notifications';
var same_day = '' ,day_before = '' ,three_day = '' ,week_before = '' ,two_week = '' 

export default class Settings extends React.Component {

	constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      }
      componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
      handleBackButtonClick() {
        this.props.navigation.navigate('Home');
        return true;
	  }
	  
	state = {
		switchValue: false,
        selectedHours: 0,
        selectedMinutes: 0,
		checked: false,
		checked1:false,
		checked2: false,
        checked3:false,
		checked4:false,
	}
	toggleSwitch = (value) => {
		this.setState({switchValue: value})
		//RNLocalNotifications.createNotification(id, text, datetime, sound[, hiddendata]);
		//RNLocalNotifications.createNotification(1, 'Some text', '2019-06-17 05:30', 'default');
	}

    onClickSameDay=()=>{
        const { checked } = this.state;
        this.setState({ checked: !checked })
				same_day = 'Same Day,'
    }

	onClickDayBefore=()=>{
		const { checked1 } = this.state;
		this.setState({ checked1: !checked1 })
		day_before = 'Day Before,'
}


onClickThreeDay=()=>{
	const { checked2 } = this.state;
	this.setState({ checked2: !checked2 })
	three_day = 'Three Day Before,'

}

onClickWeekDay=()=>{
const { checked3 } = this.state;
this.setState({ checked3: !checked3 })
week_before = 'A Week Before,'
}

onClickWeekDayBefore=()=>{
	const { checked4 } = this.state;
	this.setState({ checked4: !checked4 })
	two_week = 'Two Week Before,'
	}

	render() {
		const { checked } = this.state;
		const { checked1 } = this.state;
		const { checked2 } = this.state;
		const { checked3 } = this.state;
        const { checked4 } = this.state;
        const { selectedHours, selectedMinutes } = this.state;
		return (
			<ScrollView>
    		<View style = {styles.container}>
				<View
          			style={{
						flexWrap: 'wrap', 
						marginTop:10,marginLeft:20}}>
					<Text 
						style={{fontSize:17,color:'#f7734f'}}>Notifications</Text>
      			</View>
				<View style = {{flexDirection:'row',justifyContent: 'space-between'}}>
						<View style={{
							flexWrap: 'wrap', 
							marginTop:20,
							marginLeft:20}}>
							<Text
								style={{fontSize:13,color:'#000'}}>Birthday Notification</Text>
      					</View>
				  		<View
          					style={{
								flexWrap: 'wrap', 
								marginTop:20,
								marginRight:20}}>
						 	<Switch
          						onValueChange = {this.toggleSwitch}
          						value = {this.state.switchValue}/>
      					</View>
				</View>

				<View
  					style={{
						marginTop:5,  
    					borderBottomColor: '#BABABA',
    					borderBottomWidth: 0.3,}}/>

					<View>
						<View style={{
							flexWrap: 'wrap', 
							marginTop:15,
							marginLeft:20}}>
							<Text
								style={{fontSize:13,color:'#BABABA'}}>Time to remainder</Text>
      					</View>
				  		<View
          					style={{
								flexWrap: 'wrap', 
								marginTop:0,
								marginLeft:20}}>
						 <Text
								style={{fontSize:13,color:'#BABABA'}}>{selectedHours} Hr : {selectedMinutes} Min</Text>
      					</View>
				</View>

				<View
  					style={{
						marginTop:10,  
    					borderBottomColor: '#BABABA',
    					borderBottomWidth: 0.3,}}/>

				
				<View>
					<View style={{
						flexWrap: 'wrap', 
						marginTop:15,
						marginLeft:20}}>
							<Text
								style={{fontSize:13,color:'#000'}}>Remainder</Text>
      				</View>
				  	<View
          				style={{
							flexWrap: 'wrap', 
							marginTop:0,
							marginLeft:20}}>
						 		<Text
									style={{fontSize:13,color:'#BABABA'}}>{same_day +" " + day_before + " " +three_day +" " + week_before  +" " + two_week}</Text>
      				</View>
				</View>

				<View
  					style={{
						marginTop:10,  
    					borderBottomColor: '#BABABA',
    					borderBottomWidth: 0.3,}}/>

				<View 
					style={{flex:1, flexDirection: 'column',backgroundColor: 'white', padding: 50}} >
						<Card style={{elevation:5,}}>
							<Card.Content>
								<View>

									<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
										<View style={{flexWrap: 'wrap',marginLeft:5}}>
											<Text
												style={{fontSize:13,color:'#000'}}>Same Day</Text>
      									</View>

									  	<View style={{flexWrap: 'wrap',marginRight:5}}>
											<Checkbox
                            					status={checked ? 'checked' : 'unchecked'}
                            					onPress={() => {{this.onClickSameDay()}}}/>
      									</View>
									</View>

									<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
										<View style={{flexWrap: 'wrap',marginLeft:5}}>
											<Text
												style={{fontSize:13,color:'#000'}}>Day Before</Text>
      									</View>

									  	<View style={{flexWrap: 'wrap',marginRight:5}}>
										  <Checkbox
                            					status={checked1 ? 'checked' : 'unchecked'}
                            					onPress={() => {{this.onClickDayBefore()}}}/>
      									</View>
									</View>

									<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
										<View style={{flexWrap: 'wrap',marginLeft:5}}>
											<Text
												style={{fontSize:13,color:'#000'}}>Three Days Before</Text>
      									</View>

									  	<View style={{flexWrap: 'wrap',marginRight:5}}>
										  <Checkbox
                            					status={checked2 ? 'checked' : 'unchecked'}
                            					onPress={() => {{this.onClickThreeDay()}}}/>
      									</View>
									</View>

									<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
										<View style={{flexWrap: 'wrap',marginLeft:5}}>
											<Text
												style={{fontSize:13,color:'#000'}}>A week Before</Text>
      									</View>

									  	<View style={{flexWrap: 'wrap',marginRight:5}}>
										  <Checkbox
                            					status={checked3 ? 'checked' : 'unchecked'}
                            					onPress={() => {{this.onClickWeekDay()}}}/>
      									</View>
									</View>

									<View style = {{flexDirection:'row',justifyContent:'space-between'}}>
										<View style={{flexWrap: 'wrap',marginLeft:5}}>
											<Text
												style={{fontSize:13,color:'#000'}}>Two Week Before</Text>
      									</View>

									  	<View style={{flexWrap: 'wrap',marginRight:5}}>
										  <Checkbox
                            					status={checked4 ? 'checked' : 'unchecked'}
                            					onPress={() =>{{this.onClickWeekDayBefore()}}}/>
      									</View>
									</View>

									<View style = {{flexDirection:'row',justifyContent:'flex-end',marginTop:'10%'}}>

									  	<View style={{flexWrap: 'wrap',marginRight:5}}>
											<TouchableOpacity onPress={() =>{  this.props.navigation.navigate('Home')}}>
										  		<Text
													style={{fontSize:13,color:'#f7734f'}}>Accept</Text>
											</TouchableOpacity>
									
      									</View>
									</View>
								</View>
							</Card.Content>
						</Card>
				</View>
                                        
                <View 
					style={{flexDirection: 'column',backgroundColor: 'white',marginBottom:20, marginLeft: 60, marginRight: 60}} >
						<Card style={{elevation:5,backgroundColor:'#f7734f'}}>
							<Card.Content>
								<View>
									<View style = {{flexDirection:'column',justifyContent:'space-between'}}>
										<View style={{flexWrap: 'wrap'}}>
											<Text
												style={{fontSize:20,color:'#fff'}}>Set Time</Text>
      									</View>

                                          <Card>
							                <Card.Content>
                                                <View style={styles.container_date}>
                                                    <Text style={{color:'black'}}>{selectedHours}hr:{selectedMinutes}min</Text>
                                                        <TimePicker
                                                            selectedHours={selectedHours}
                                                            //initial Hourse value
                                                            selectedMinutes={selectedMinutes}
                                                            //initial Minutes value
                                                            onChange={(hours, minutes) => this.setState({ 
                                                            selectedHours: hours, selectedMinutes: minutes 
                                                        })}/>
                                                    <View style={{flexWrap: 'wrap',marginRight:5}}>
											            <TouchableOpacity onPress={() =>{}}>
										  		            <Text
													            style={{fontSize:15,color:'#f7734f',}}>OK</Text>
											            </TouchableOpacity>
									
      									</View>
                          </View>
                                        </Card.Content>
                                        </Card>
									</View>
								</View>
							</Card.Content>
						</Card>
				</View>
     
            </View>
			</ScrollView>
			  );
			}
		}


const styles = StyleSheet.create({
  container: {
         flex: 1,
         backgroundColor: '#fff',
         flexDirection: 'column',
     },
     input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
     },
     submitButton: {
        backgroundColor: '#000',
        padding: 7,
        margin: 30,
        height: 40,
        alignItems:'center',
        marginRight:60
     },
     submitButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:17
     },
     container_date: {
        flex: 1,
        backgroundColor: '#fff',
        margin:20,
        alignItems: 'center',
        justifyContent: 'center',
      },
 });
 