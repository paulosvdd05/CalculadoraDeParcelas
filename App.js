import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import Tabela from './components/Tabela';

const initialState = {
  data: '',
  parcelas: '',
  total: '',
  intervalo: '',
  lista: []
}

export default class App extends Component {

  state = {
    ...initialState
  }

  calcular = () => {
    for (let i = 0; i < this.state.parcelas; i++) {
      this.setState({
        lista: [...this.state.lista, {
          id: i,
          total: this.state.total / 5,
        }]
      }, () => {
        
      })
    }
  }

  render() {
    return (
      <View>
        <View>
          <View>
            <TextInput style={styles.input}
              placeholder='Insira a data.'
              value={this.state.data}
              onChangeText={data => this.setState({ data })}
              keyboardType='numeric'
            />
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