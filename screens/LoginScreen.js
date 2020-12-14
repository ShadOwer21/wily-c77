import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView ,Alert , ToastAndroid} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            emailId:'',
            password:'',
        }
      }
    
      login=async(email,password)=>{
          if (email && password){
              try{
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                  this.props.navigation.navigate('Transaction')
                })
                }
                catch(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                }
          }
          else {
              alert("enter email and password")
          }
}
    render(){
        return(
            <KeyboardAvoidingView> style={{ alignItem:'center' , marginTop:20  }}
            <View>
                <TextInput style={styles.loginBox} placeholder="abc@example.com" keyboardType='email-address' onChangeText={(text)=>{
                    this.setState({
                        emailId:text,
                    })
                }} />
                    <TextInput style={styles.loginBox} placeholder="enter password" secureTextEntry={true} onChangeText={(text)=>{
                    this.setState({
                        password:text,
                    })
                }} />
                
                
            </View>
            <View>
            <TouchableOpacity style={styles.button} 
             onPress={()=>{this.login(this.state.emailId,this.state.password)}}
             >
               <Text>Log In</Text>
             </TouchableOpacity>
            
            </View>
          </KeyboardAvoidingView>
        )
         
            
    }    
}
const styles = StyleSheet.create({ loginBox: { width: 300, height: 40, borderWidth: 1.5, fontSize: 20, margin:10, paddingLeft:10 } 
,
button:{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}
})