import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default props => {
    return (
        <View style={[styles.produto, {backgroundColor: props.index % 2 == 0 ? "#ffffff" : "#F2F2F2" }]}>

            <Text>{props.index + 1}X{props.totalParcela}</Text>
            <Text>{props.data}</Text>
            <Text>R${props.total.toLocaleString('pt-br', {minimumFractionDigits: 2})}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    produto: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,

    },
    name: {
        color: '#014073',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    desc: {
        color: '#014073',

    },
    valor: {
        color: '#014073',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right'
    },
    qntd: {
        color: '#014073',
        textAlign: 'right'
    }
})