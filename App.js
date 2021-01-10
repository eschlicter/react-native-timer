import React from 'react';
import { StyleSheet, Text, View, ScrollView, TimePickerAndroid } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import {newTimer} from './utils/TimerUtils'

import EditableTimer from './components/EditableTimer'
import ToggleableTimerForm from './components/ToggleableTimerForm'

export default class App extends React.Component {

  componentDidMount(){
    const TIME_INTERVAL = 1000; 

    this.intervalId = setInterval(() => {
      const {timers} = this.state;

      this.setState({
        timers: timers.map(timer => {
          const {elapsed, isRunning} = timer;
          console.log("timer", timer)
          return {
            ...timer, 
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed
          }
        })
      })
    }, TIME_INTERVAL);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
  state = {
    timers: [
      {
        title: 'Salt the steps',
        project: 'House Chores',
        uuid: uuidv4(),
        elapsed: 345235, 
        isRunning: true
      },
      {
        title: 'Bake cake',
        project: 'Kitchen Chores',
        uuid: uuidv4(),
        elapsed: 23452115, 
        isRunning: false
      },
    ]
  };

  handleCreateFormSubmit = timer => {
    const {timers}=this.state;

    this.setState({
      timers: [newTimer(timer), ...timers]
    })
  }

  handleFormSubmit = attrs => {
    const {timers} = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id){
          const {title, project} = attrs;

          return{
            ...timer, title, project
          }
        }
        return timer;
      })
    })
  }

  handleDeletePress = timerId => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId)
    })
  }

  toggleTimer = timerId => {
    this.setState(prevState => {
      const {timers} = prevState;
      return {
        timers: timers.map(timer => {
          const {id, isRunning} = timer;

          if (id == timerId){
            return{
              ...timer, 
              isRunning: !isRunning
            };
          }
          return timer;
        })
      }
    })
  }
  render(){
    const {timers} = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm  onFormSubmit={this.handleCreateFormSubmit}/>
          {timers.map(
            ({title, project, id, elapsed, isRunning}) => (
              <EditableTimer key={id} id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} onFormSubmit={this.handleFormSubmit} onDeletePress={this.handleDeletePress} onStartPress={this.toggleTimer} onStopPress={this.toggleTimer}/>
            )
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer:{
    paddingTop: 35, 
    paddingBottom: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#d6d7da'
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  timerList: {
    paddingBottom: 15
  }
});
