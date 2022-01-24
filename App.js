import React from 'react';
import { View, Button, Text, ScrollView, StyleSheet, Switch, TextInput, Keyboard } from 'react-native';
import Constants from 'expo-constants'
// const styles = {
//   fontFamily:'sans-serif',
//   textAlign:'center',
// };
const styles = StyleSheet.create({
  TodoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 35,
    margin: 30,
  },
  buttonText: {
    fontSize: 20,
    margin: 5,
  },

  appContainer: {

    paddingTop: Constants.statusBarHeight,


    backgroundColor: 'grey',

  },
  fill: {
    flex: 1,
  },

})

let id = 0;

const Todo = props => (
  <View style={[styles.TodoContainer, styles.buttonText]}>
    <Switch style={{ flex: 1 }} value={props.todo.checked} onValueChange={() => props.CompletedTodo()} />
    <Button style={[styles.buttonText, { flex: 2 }, { alignItems: 'start' }]} onPress={() => props.onDelete()} title="delete" />
    <Text style={[styles.buttonText, { flex: 3 }, { alignItems: 'center' }]}><Text style={{ textAlign: 'center' }}>{props.todo.text}</Text>
    </Text>
  </View>
)
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      input: "Enter a todo please",

    }
  }

  doneTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) { return todo }
        else {
          todo.checked = !todo.checked
          if (todo.checked === false) {

            return todo
          }
          else {

            return todo
          }
        }
      })
    })
  }
  addTodo() {
    id++;

    Keyboard.dismiss()
    const text = this.state.input
    this.textInput.clear()

    this.setState({
      todos: [...this.state.todos, { id: id, text: text, checked: false }],
      input: "No to do entered"
    })

  }
  removeTodo(id) {
    this.textInput.clear()
    this.setState({

      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }


  render() {
    return (
      <View style={[styles.appContainer, styles.fill]} >
        <Text style={styles.label}> ToDoCount :           {this.state.todos.length}</Text>
        <Text style={styles.label}> Unchecked Todo: {this.state.todos.filter(todo => !todo.checked).length} </Text>

        <TextInput style={{ margin: 20 }} placeholder="Enter Todo" onChangeText={(input) => this.setState({ input })} ref={input => { this.textInput = input }} />
        <Button style={{ marginTop: 50 }} onPress={() => this.addTodo()} title="Add Todo" />

        <ScrollView style={styles.fill}>
          {this.state.todos.map(todo => <Todo onDelete={() => this.removeTodo(todo.id)} CompletedTodo={() => this.doneTodo(todo.id)} todo={todo} />)}
        </ScrollView>
      </View>
    )
  }
}
