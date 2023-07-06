import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableNativeFeedback, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import Tabela from './components/Tabela';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import 'moment/locale/pt-br'
import MaskInput, { Masks } from 'react-native-mask-input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
    }
    let newList = []
    let ultimaData = new Date(this.state.date)
    let soma = 0;

    for (let i = 0; i < this.state.parcelas; i++) {
      ultimaData = new Date((ultimaData).setDate(ultimaData.getDate() + parseInt(this.state.intervalo)))
      newList.push({
        id: i,
        totalParcela: this.state.parcelas,
        total: parseFloat(this.toPrecisao((this.state.total.replace(',', '.').replace('R$', '').replace('R$', '') / this.state.parcelas), 2)),
        data: `${ultimaData}`
      })
    }
    this.setState({ lista: newList }, () => {
      soma = this.state.lista.reduce((total, item) => parseFloat(item.total) * this.state.parcelas, 0)
      if (soma > this.state.total.replace(',', '.').replace('R$', '') || soma < this.state.total.replace(',', '.').replace('R$', '')) {
        this.setState({ ...this.state.lista[this.state.lista[0].total = (this.state.total.replace(',', '.').replace('R$', '') - soma) + this.state.lista[0].total] })
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
      <View style={{ flex: 1, justifyContent:'space-evenly' }}>
        <View style={styles.formContainer}>
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
            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
              <MaskInput style={{ width: '100%', alignItems:'center', justifyContent:'center'}}
                value={this.state.total}
                mask={Masks.BRL_CURRENCY}
                onChangeText={total => this.setState({ total }, () => {console.warn(this.state.total)})}
                keyboardType='numeric'
              />
            </View>

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
            <Text style={{ color: '#fff', fontWeight:'bold' }}>Calcular</Text>
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
    borderRadius: 10,
    shadowColor: '#171717',
    elevation: 10,
    justifyContent: 'center'
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
    flex:1
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
    marginBottom:10
  },
  formContainer: {
    flex: 3,
  }
})