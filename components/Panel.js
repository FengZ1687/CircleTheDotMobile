import React from 'react';
import { StyleSheet, Text, View,FlatList, YellowBox,Button , TouchableOpacity} from 'react-native';
import  { useState, useEffect } from 'react';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       Panel : [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]
    ],
     dotx:5,
     doty:5
    };
   
  }


  Nextmovepoint(destination){
    //get the yellow dot next moving step
    let current = [this.state.dotx,this.state.doty] 
    if(this.state.dotx===0||this.state.dotx===10||this.state.doty===0||this.state.doty===10){
     return
    }
    
    let p1 = [current[0],current[1]+1]
    let p2 = [current[0],current[1]-1]
    let p3 = [current[0]+1,current[1]] 
    let p4 = [current[0]-1,current[1]]
    let p5 = (current[0]%2===0)?[current[0]-1,current[1]+1]:[current[0]-1,current[1]-1] 
    let p6 = (current[0]%2===0)?[current[0]+1,current[1]+1]:[current[0]+1,current[1]-1]
    //p1 to p6 are the 6 directions that the yellow dot can move  
    let add = [p1,p2,p3,p4,p5,p6]
     //remove black blocked dots
    add = add.filter( item =>
     !(this.state.Panel[item[0]][item[1]]===2)
    )   
  
    //let  distance = Math.abs(destination[0]-p1[0]) + Math.abs(destination[1]-p1[1])
    let  distance = 100000

    let num = 0;
     //get the shortest dirction
     add.forEach((Points,index )=>{
          if(distance>=(Math.abs(destination[0]-Points[0]) + Math.abs(destination[1]-Points[1]))){
            console.log(distance,index)
             distance = (Math.abs(destination[0]-Points[0]) + Math.abs(destination[1]-Points[1]))
             num = index
             
          }
     })

//     for(let i=1;i<add.length;i++){
//      if(distance>(Math.abs(destination[0]-add[i][0]) + Math.abs(destination[1]-add[i][1]))){
//         distance = (Math.abs(destination[0]-add[i][0]) + Math.abs(destination[1]-add[i][1]))
//         num = i
//                        
//         }
//      }
     return add[num]



  }


  getdestination(){
    //get the shorest destination on the edge of the panel based On BFS search 
    let cur = [[this.state.dotx,this.state.doty]]
    let current = []
    let add = [[]]
    
    let visited = []
    while (cur.length>0){
      let j = cur.length        
     for(let k =0;k<j;k++){
      current = cur.shift()
      
      if(current[0]===0||current[0]===10||current[1]===0||current[1]===10){
        
        return current
      }
      visited.push(current[0]*11+current[1]);
     let p1 = [current[0],current[1]+1]
     let p2 = [current[0],current[1]-1]
     let p3 = [current[0]+1,current[1]] 
     let p4 = [current[0]-1,current[1]]
     let p5 = (current[0]%2===0)?[current[0]-1,current[1]+1]:[current[0]-1,current[1]-1] 
     let p6 = (current[0]%2===0)?[current[0]+1,current[1]+1]:[current[0]+1,current[1]-1] 
     add = [p1,p2,p3,p4,p5,p6]
       
      add = add.filter( item =>
       !(visited.includes(item[0]*11+item[1])||(this.state.Panel[item[0]][item[1]]===2))
      )  
      //console.log(add)
     cur = [...cur,...add]  
   }
   }
   
   return [-1,-1]
  }

  handleClick = (x,y)=> {
    let step = []
    let move  = []
    if(this.state.Panel[x][y]===0){
      if(this.state.dotx===0||this.state.dotx===10||this.state.doty===0||this.state.doty===10){
        alert("Dot escaped. you lose ! try to block yellow dot move to the edge");
        this.initialzePanel()
        return
      }
      let copy = this.state.Panel.slice();
      copy[x][y]  = 2 ;
      this.setState({
        Panel: copy
      })
      step =  this.getdestination() 
      if(step[0]===-1&&step[1]===-1){  
        alert("Congratulations, you win !");
        this.initialzePanel()
        return
      }
      
      move = this.Nextmovepoint(step)
      copy[this.state.dotx][this.state.doty] = 0;
      copy [move[0]][move[1]] = 1;
      this.setState({
        Panel: copy,
        dotx : move[0],
        doty : move[1]
      })
     
   }
  }

  randompoint(){
    //generate a ramdon point at the beginning of the game
   let x = Math.floor(Math.random() * 11)  
   let y = Math.floor(Math.random() * 11)
   let res = [x,y]
   while(this.state.Panel[x][y]!==0){
     x = Math.floor(Math.random() * 11)  
     y = Math.floor(Math.random() * 11) 
     res = [x,y] 
   }
   return res
 }

 initialzePanel = ()=>{
  
   
  let copy = [
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0]
]
  for(let i=0;i<10;i++){
    let change = this.randompoint()
    
    copy[change[0]][change[1]] = 2
    }
    copy[5][5] =1
    this.setState({
      Panel: copy,
      dotx:5,
      doty:5
    })  
    
  }

  componentDidMount(){
    this.initialzePanel()

   }

  renderdot = (row,col)=>{
      var value = this.state.Panel[row][col]
      switch(value){
       // case 0: return <View style={styles.tile} onClick={()=>this.handleClick(row,col)}></View>
        case 0: return <TouchableOpacity style={styles.tile} onPress={()=>this.handleClick(row,col)}/>
        case 1: return <View style={styles.move}/>
        case 2: return <View style={styles.block}/>
        
           
      }
    }

   lapsList(index) {
     return (
      
      <View style={{flexDirection:"row",marginTop:-4}}>
        {this.renderdot(index,0)}
        {this.renderdot(index,1)}
        {this.renderdot(index,2)}
        {this.renderdot(index,3)}
        {this.renderdot(index,4)}
        {this.renderdot(index,5)}
        {this.renderdot(index,6)}
        {this.renderdot(index,7)}
        {this.renderdot(index,8)}
        {this.renderdot(index,9)}
        {this.renderdot(index,10)}
        
      </View>
      )
     

  }



 secondList(index) {
    return (
     
     <View style={{flexDirection:"row",paddingLeft:35,marginTop:-4}}>
        {this.renderdot(index,0)}
        {this.renderdot(index,1)}
        {this.renderdot(index,2)}
        {this.renderdot(index,3)}
        {this.renderdot(index,4)}
        {this.renderdot(index,5)}
        {this.renderdot(index,6)}
        {this.renderdot(index,7)}
        {this.renderdot(index,8)}
        {this.renderdot(index,9)}
        {this.renderdot(index,10)}
     </View>
     )

 }
render(){
return (
    <View style={styles.container}>
    {this.secondList(0)}
     {this.lapsList(1)}
     {this.secondList(2)}
     {this.lapsList(3)}
     {this.secondList(4)}
     {this.lapsList(5)}
     {this.secondList(6)}
     {this.lapsList(7)}
     {this.secondList(8)}
     {this.lapsList(9)}
     {this.secondList(10)}
     

    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    height:420,
    width: 400,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:2,
    width:30,
    height:30,
    borderRadius: 30/2,
    backgroundColor:'white',
  },
  move:{
    borderWidth:2,
    width:30,
    height:30,
    borderRadius: 30/2,
    backgroundColor:'yellow',
  },
  block:{
    borderWidth:2,
    width:30,
    height:30,
    borderRadius: 30/2,
    backgroundColor:'black',
  },

});


export default Panel;
