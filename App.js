import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableNativeFeedback, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import Tabela from './components/Tabela';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/pt-br'
import MaskInput, { Masks } from 'react-native-mask-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const initialState = {
  date: new Date(),
  parcelas: '',
  total: '',
  intervalo: '30',
  lista: [],
  showDatePicker: false,
  tipoCalendario: 'Selecionar'
}

export default class App extends Component {

  state = {
    ...initialState
  }

  toPrecisao(nr, casas) {
    const og = Math.pow(10, casas)
    return Math.trunc(nr * og) / og;
  }

  calcular = () => {

    Keyboard.dismiss()
    if (this.state.parcelas == '' || this.state.total == '' || this.state.intervalo == '') {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos!',
        [
          { text: 'ENTENDI' }
        ],
        { cancelable: false }
      );
    } else {
      let newList = []
      let ultimaData = this.state.tipoCalendario == 'Escrever' ? moment(this.state.date, "DD/MM/YYYY").toDate() : new Date(this.state.date)
      let soma = 0;

      for (let i = 0; i < this.state.parcelas; i++) {
        ultimaData = new Date((ultimaData).setDate(ultimaData.getDate() + parseInt(this.state.intervalo)))
        newList.push({
          id: i,
          totalParcela: this.state.parcelas,
          total: parseFloat(this.toPrecisao((this.state.total.replace('.', '').replace(',', '.').replace('R$', '') / this.state.parcelas), 2)),
          data: `${ultimaData}`
        })
      }
      this.setState({ lista: newList }, () => {
        soma = this.state.lista.reduce((total, item) => parseFloat(item.total) * this.state.parcelas, 0)
        if (soma > this.state.total.replace('.', '').replace(',', '.').replace('R$', '') || soma < this.state.total.replace('.', '').replace(',', '.').replace('R$', '')) {
          this.setState({ ...this.state.lista[this.state.lista[0].total = (this.state.total.replace('.', '').replace(',', '.').replace('R$', '') - soma) + this.state.lista[0].total] })
        }
      })



    }


  }

  getDatePicker = () => {
    let datePicker = <DateTimePicker
      value={this.state.date}
      onChange={(_, date) => this.setState({ date, showDatePicker: false })}
      mode='date' />

    const dateString = moment(this.state.date).format(' DD[/]MM[/]YYYY')

    if (Platform.OS === 'android') {
      datePicker = (
        <View style={{ flex: 1 }}>
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
      <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text>Data:</Text>
            <View style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
              {this.state.tipoCalendario == 'Selecionar' ? this.getDatePicker() : <MaskInput
                style={{ flex: 1 }}
                value={this.state.date}
                mask={Masks.DATE_DDMMYYYY}
                onChangeText={date => this.setState({ date })}
                keyboardType='numeric' />}
              <View style={{ flexDirection: 'row', marginRight: 5 }}>
                <TouchableNativeFeedback onPress={() => this.setState({ tipoCalendario: 'Selecionar', date: new Date() })}>
                  <Icon name='calendar-month' size={25} color={this.state.tipoCalendario == 'Selecionar' ? '#024EB4' : null} />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.setState({ tipoCalendario: 'Escrever', date: moment(this.state.date).format(' DD[/]MM[/]YYYY') })}>
                  <Icon name='calendar-edit' size={25} color={this.state.tipoCalendario == 'Escrever' ? '#024EB4' : null} />
                </TouchableNativeFeedback>

              </View>

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

            <MaskInput style={styles.input}
              value={this.state.total}
              mask={Masks.BRL_CURRENCY}
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
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Calcular</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.FlatListContainer}>
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
    color: '#313131',
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
    justifyContent: 'center',
    width: '100%'
  },
  botao: {
    backgroundColor: '#024EB4',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#171717',
    elevation: 10,
  },
  botaoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  inputContainer: {
    marginHorizontal: 10, marginTop: 10,
  },
  FlatListContainer: {
    flex: 3,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#171717',
    elevation: 10,
    marginBottom: 10
  },
  formContainer: {
    flex: 3,
  },
  prodList: {
    marginVertical: 10,
  },
  date: {
    color: '#313131'
  }
})