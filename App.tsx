import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const initialState = {
  data: '',
  parcelas: '',
  total: '',
  intervalo: ''
}

export default class App extends Component {

  state = {
    ...initialState
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
              value={this.state.parcelas}
              onChangeText={parcelas => this.setState({ parcelas })}
              keyboardType='numeric'
            />
          </View>
          <View>
            <TextInput style={styles.input}
              placeholder='Insira o valor total.'
              value={this.state.total}
              onChangeText={total => this.setState({ total })}
              keyboardType='numeric'
            />
          </View>
          <View>
            <TextInput style={styles.input}
              placeholder='Insira o intervalo entre as datas.'
              value={this.state.total}
              onChangeText={total => this.setState({ total })}
              keyboardType='numeric'
            />
          </View>
        </View>

      </View >
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
})