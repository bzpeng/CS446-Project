import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {createListdataSource} from '../utils/HelpFuncs';

export default class SearchEvent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name : '',
      searchEvents: createListdataSource([]),
      searchEventIds: [],
      eventsRef : this.props.firebaseApp.database().ref('Events/'),
    }
  }

  componentWillMount() {
    this._searchEventsCallBack = this._searchEventsCallBack.bind(this)
    this.state.eventsRef.on('value', this._searchEventsCallBack, function(error) {
      console.error(error);
    });
  }

  componentWillUnmount() {
    this.state.eventsRef.off('value', this._searchEventsCallBack);
  }

  _onBack() {
    this.props.navigator.pop();
  }

  _searchEventsCallBack(snapshot) {
    var events = []
    var eventIds = []
    var searchName = this.state.name
    snapshot.forEach(function(data) {
      var dataVal = data.val()
      if (searchName != '' && dataVal.Name.includes(searchName)) {
        events.push(dataVal.Name)
        eventIds.push(data.key)
      }
    });
    this.setState({
      searchEvents: createListdataSource(events),
      myeventIds: eventIds
    });
  }

  _onSearch() {
    this.state.eventsRef.once('value').then(this._searchEventsCallBack.bind(this))
  }

  _onEvent(rowData, rowID) {
  }
}

AppRegistry.registerComponent('SearchEvent', () => SearchEvent);