import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { ColorAccent } from '../Theming/Colors'


const NumberContainer = props =>{
return(
    <View style={styles.container}> 
 
            <Text style={styles.number}>
{props.children}
            </Text>
    
    </View>  
)
}

const styles = StyleSheet.create({
container:{
    borderWidth:2,
    borderColor: ColorAccent.accent,
    padding: 10,
    borderRadius: 8,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center',
    textAlign:"center"
}
,
number:{
    color: ColorAccent.accent,
    fontSize:22
}
})

export default NumberContainer