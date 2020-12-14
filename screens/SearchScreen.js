import React from 'react';
import { Text, View, FlatList,TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import db from '../config';


export default class Searchscreen extends React.Component{
 constructor(props){
   super(props);
   this.state= {
     allTransactions:[],
     lastVisibleTransaction:null,
     search:''
   }
 }

 componentDidMount=async()=>{
   console.log("hello")
   const quary =await db.collection("transactions").get()
   quary.docs.map(doc=>{
     this.setState({
       allTransactions:[...this.state.allTransactions, doc.data()]
      //allTransactions:doc.data()
     })
     console.log(doc.data());
   })
 }
fetchMoreTransaction=async()=>{
  var text =this.state.search.toUpperCase();
  var enteredText = text.split("");
  //const quary =await db.collection("transactions").startAfter(this.state.lastVisibleTransaction).limit(10).get()
  if(enteredText[0].toUpperCase() === "B" ){
    const quary= await db.collection("transactions").where('bookId', '==', text ).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    
  
  quary.docs.map(doc=>{
    this.setState({
      allTransactions:[...this.state.allTransactions, doc.data()],
      lastVisibleTransaction:doc
     //allTransactions:doc.data()
    })    
  })
}
else if(enteredText[0].toUpperCase() === "S" ){
  const quary= await db.collection("transactions").where('studentId', '==', text ).startAfter(this.state.lastVisibleTransaction).limit(10).get()
  

quary.docs.map(doc=>{
  this.setState({
    allTransactions:[...this.state.allTransactions, doc.data()],
    lastVisibleTransaction:doc
   //allTransactions:doc.data()
  })    
})
}
}

searchTransactions=async(text)=>{
 var text =this.state.search.toUpperCase();
 var enteredText = text.split("");
 this.setState({
   allTransactions:[],
 })
 if(enteredText[0].toUpperCase() === "B" ){
  const quary= await db.collection("transactions").where('bookId', '==', text ).get()
  

quary.docs.map(doc=>{
  this.setState({
    allTransactions:[...this.state.allTransactions, doc.data()],
    lastVisibleTransaction:doc
   //allTransactions:doc.data()
  })    
})
}
else if(enteredText[0].toUpperCase() === "S" ){
const quary= await db.collection("transactions").where('studentId', '==', text ).get()


quary.docs.map(doc=>{
this.setState({
  allTransactions:[...this.state.allTransactions, doc.data()],
  lastVisibleTransaction:doc
 //allTransactions:doc.data()
})    
})
}
                  
}
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput style={styles.bar}
                placeholder="Enter BookId or StudentId"
                onChangeText={text=>{this.setState({search:text})}}           
             />
             <TouchableOpacity style={styles.serachButton} 
             onPress={()=>{this.searchTransactions(this.state.search)}}
             >
               <Text>Search</Text>
             </TouchableOpacity>
          </View>
       <FlatList
           data={this.state.allTransactions}
           renderItem={({item})=>(
             <View style={{borderBottomWidth:2}}>
               <Text> {"book Id : " +item.bookId} </Text>
               <Text> {"student Id : " +item.studentId} </Text>
               <Text> {"transaction Type : " +item.transactionType} </Text>
               <Text> {"date : " +item.date.toDate()} </Text>
             </View>
           )}
           keyExtractor={(item,index)=>{index.toString()}}
           onEndReached={this.fetchMoreTransaction}
           onEndReachedThreshold={0.7}
       />
      </View>

      )
    }
  }
  const styles = StyleSheet.create({ container: { flex: 1, marginTop: 20 }, searchBar:{ flexDirection:'row', height:40, width:'auto', borderWidth:0.5, alignItems:'center', backgroundColor:'grey', }, bar:{ borderWidth:2, height:30, width:300, paddingLeft:10, }, searchButton:{ borderWidth:1, height:30, width:50, alignItems:'center', justifyContent:'center', backgroundColor:'green' } })
