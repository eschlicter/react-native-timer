import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import EditableTimer from './components/EditableTimer'
import ToggleableTimerForm from './components/ToggleableTimerForm'

export default class App extends React.Component {
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
  render(){
    const {timers} = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm  />
          {timers.map(
            ({title, project, id, elapsed, isRunning}) => (
              <EditableTimer key={id} id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} />
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
