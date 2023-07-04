import React from 'react'
import { View, Text } from 'react-native'


export default props =>{
    return(
        <View>
            <Text>{props.data}</Text>
            <Text>{props.qntdParcelas}</Text>
            <Text>{props.total}</Text>
        </View>
    )
}