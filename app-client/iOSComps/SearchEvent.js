import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ListView,
  PickerIOS,
  Switch
} from 'react-native';
import SharedSearchEvent from '../sharedComps/SearchEvent';
import EventPage from '../iOSComps/EventPage';
import Constants from '../utils/Constants'

export default class SearchEvent extends SharedSearchEvent {
  constructor(props){
    super(props)
  }

  _onEvent(rowData, rowID) {
    this.props.navigator.push({
      component: EventPage,
      title: rowData,
      passProps: {
        firebaseApp : this.props.firebaseApp,
        name : this.props.name,
        fbId : this.props.fbId,
        eventId : this.state.myeventIds[rowID]
      }
    });
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight onPress = {this._onEvent.bind(this, rowData, rowID)}>
        <Text style = {styles.text}
          numberOfLines={1}>
          {rowData}
        </Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.search}>
          <View style = {{flex: 3}}>
            <TextInput
              style={styles.searchtextinput}
              placeholder='Type event name or location.'
              onChangeText={(text) => this.setState({name : text})}
              underlineColorAndroid = 'transparent'
            />
          </View>
            <View style = {{flex: 1, alignItems: 'flex-end'}}>
            <TouchableHighlight
              style={styles.button}
              onPress={this._onSearch.bind(this)}
              underlayColor = 'lightgray'>
              <Text style={styles.searchbuttontext}> Search </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style = {{height:5}}/>

        <View style = {styles.search}>
          <View style={{flex: 4, flexDirection: 'row'}}>
            <Text style={styles.title}>Category: </Text>
            <Text style={[styles.title, this.state.all ? {} : {color:'grey'}]}>All</Text>
          </View>
          <View style={{flex: 2}}>
            <Switch
              onValueChange={this._onSwitchAll.bind(this)}
              value={this.state.all}/>
          </View>
          <View style={{flex: 6}}>
            <TouchableHighlight
              style={styles.type}
              onPress={this._onTypePress.bind(this)}
              underlayColor = 'lightgray'>
              <Text style={[styles.typetext, !this.state.all ? {} : {color:'grey'}]}> {this.state.type} </Text>
            </TouchableHighlight>
          </View>
        </View>

        {this.state.typePickerVisible && <View style = {styles.emptyview1}>
          <PickerIOS
            selectedValue = {this.state.type}
            onValueChange={this._onTypeChange.bind(this)}>
            {Constants.eventTypes.map((e) => (
              <PickerIOS.Item
                key= 'key'
                value= {e}
                label= {e}
              />
            ))}
          </PickerIOS>
        </View>}

        <View style = {{height:5}}/>

        <View style={styles.container2}>
          <ListView
            dataSource={this.state.searchEvents}
            renderRow={this._renderRow.bind(this)}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    paddingTop: 70,
    paddingBottom: 55
  },
  container1: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textinput: {
    height: 45,
    fontSize: 30,
    paddingHorizontal: 5
  },
  container2: {
    flex: 3,
    width: 360,
    backgroundColor: '#C5CAE9',
    paddingHorizontal: 5
  },
  button: {
    height:40,
    width: 80,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 123, 253, 1.0)'
  },
  text: {
    color: '#fffff0',
    fontSize: 40,
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 360,
    height: 40
  },
  searchtextinput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '300',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  searchbuttontext: {
    fontSize: 20,
    color:'white',
  },
  title: {
    fontSize: 20,
    color:'rgba(5, 123, 253, 1.0)',
  },
  type: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40
  },
  emptyview1: {
    width: 360
  },
  typetext: {
    fontSize:30,
    fontWeight: '300'
  },
});

AppRegistry.registerComponent('SearchEvent', () => SearchEvent);
