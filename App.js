import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import Tabela from './components/Tabela';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

const initialState = {
  date: new Date(),
  parcelas: '',
  total: '',
  intervalo: '',
  lista: [],
  showDatePicker: false
}

export default class App extends Component {

  state = {
    ...initialState
  }

  calcular = () => {
    let newList = []
    let ultimaData = new Date()
    for (let i = 0; i < this.state.parcelas; i++) {
      newList.push({
        id: i,
        total: this.state.total / this.state.parcelas,
        data: ultimaData.setDate(this.state.date.getDate() + this.state.intervalo)
      })
      
    }
    this.setState({ lista: newList }, console.warn(this.state.lista))
   
  }

  getDatePicker = () => {
    let datePicker = <DateTimePicker
      value={this.state.date}
      onChange={(_, date) => this.setState({ date, showDatePicker: false })}
      mode='date' />

    const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      )
    }
    return datePicker
  }

  render() {
    return (
      <View>
        <View>
          <View style={styles.input}>
            {this.getDatePicker()}
          </View>
          <View>
            <TextInput style={styles.input}
              placeholder='Insira a quantidade de parcelas.'
              value={this.state.parcelas.toString()}
              onChangeText={parcelas => this.setState({ parcelas: parseInt(parcelas) })}
              keyboardType='numeric'
            />
          </View>
          <View>
            <TextInput style={styles.input}
              placeholder='Insira o valor total.'
              value={this.state.total.toString()}
              onChangeText={total => this.setState({ total: parseInt(total) })}
              keyboardType='numeric'
            />
          </View>
          <View>
            <TextInput style={styles.input}
              placeholder='Insira o intervalo entre as datas.'
              value={this.state.intervalo.toString()}
              onChangeText={intervalo => this.setState({ intervalo: parseInt(intervalo) })}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.botaoContainer}>
          <TouchableOpacity style={styles.botao} onPress={this.calcular}>
            <Text style={{ color: '#fff' }}>Calcular</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList style={styles.prodList}
            data={this.state.lista}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => <Tabela {...item} />}
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
    justifyContent:'center'
  },
  botao: {
    backgroundColor: '#011627',
    padding: 10,
    borderRadius: 5
  },
  botaoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
})