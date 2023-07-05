import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import Tabela from './components/Tabela';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/pt-br'

const initialState = {
  date: new Date(),
  parcelas: '',
  total: '',
  intervalo: '30',
  lista: [],
  showDatePicker: false
}

export default class App extends Component {

  state = {
    ...initialState
  }

   toPrecisao(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

  calcular = () => {
    let newList = []
    let ultimaData = new Date(new Date().setDate(this.state.date.getDate()))
    let soma = 0;
    for (let i = 0; i < this.state.parcelas; i++) {
      ultimaData = new Date((ultimaData).setDate(ultimaData.getDate() + parseInt(this.state.intervalo)))
      newList.push({
        id: i,
        totalParcela: this.state.parcelas,
        total: this.toPrecisao((this.state.total / this.state.parcelas), 2),
        data: `${ultimaData}`
      })
    }
    this.setState({ lista: newList }, () => {
      soma = this.state.lista.reduce((total, item) => parseFloat(item.total) * this.state.parcelas, 0)
      if (soma > this.state.total || soma < this.state.total) {
        this.setState({ ...this.state.lista[this.state.lista[0].total = (this.state.total - soma) + parseFloat(this.state.lista[0].total)] })
      }
  
    })
    

  }

  getDatePicker = () => {
    let datePicker = <DateTimePicker
      value={this.state.date}
      onChange={(_, date) => this.setState({ date, showDatePicker: false })}
      mode='date' />

    const dateString = moment(this.state.date).format(' DD[/]MM[/]YYYY')

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
          <View style={styles.inputContainer}>
            <Text>Data:</Text>
            <View style={styles.input}>
              {this.getDatePicker()}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text>Parcelas:</Text>
            <TextInput style={styles.input}
              placeholder='Insira a quantidade de parcelas.'
              value={this.state.parcelas}
              onChangeText={parcelas => this.setState({ parcelas })}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Total:</Text>
            <TextInput style={styles.input}
              placeholder='Insira o valor total.'
              value={this.state.total}
              onChangeText={total => this.setState({ total })}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Intervalo Entre Datas:</Text>
            <TextInput style={styles.input}
              placeholder='Insira o intervalo entre as datas.'
              value={this.state.intervalo}
              onChangeText={intervalo => this.setState({ intervalo })}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.botaoContainer}>
          <TouchableOpacity style={styles.botao} onPress={this.calcular}>
            <Text style={{ color: '#fff' }}>Calcular</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 200 }}>
          <FlatList style={styles.prodList}
            data={this.state.lista}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => <Tabela {...item} data={moment(new Date(item.data)).format('DD[/]MM[/]YYYY')} index={index} />}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
    justifyContent: 'center'
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
  },
  inputContainer: {
    marginHorizontal: 10, marginTop: 10,
  }
})