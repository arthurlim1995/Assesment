import React from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, RefreshControl } from 'react-native';
import ContactInfo from '/data.json';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Avatar } from 'react-native-elements';

var detData = [];

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: ContactInfo,
      refreshing: true
    };
  }

  contactName = (item) => {
    const name = {item.firstName} + " " + {item.lastName};
    return <Text style={styles.text} onPress={()=> this.props.navigation.navigate('Detail', {Contact: item})}>{name}</Text>;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.contact}
          renderItem={({item}) => this.contactName(item)}
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            />
          }
        />
      </View>
    );
  }
}

class DetailScreen extends React.Component {

  render() {
    const ContactDet = this.props.navigation.state.params.Contact;

    const refLastName = useRef();
    const refEmail = useRef();
    const refPhone = useRef();
    
    let FirstNm = ""
    let LastNm = ""
    let Email = ""
    let Phone = ""

    if (ContactDet != null) {
      FirstNm = ContactDet.firstName;
      LastNm = ContactDet.lastName;
      Email = ContactDet.email;
      Phone = ContactDet.phone;
    }

    chkFirstName = (value) => {
      if(!value.trim()) {
        alert("Please Enter Name");
        return;
      }
    }

    chkLastName = (value) => {
      if(!value.trim()) {
        alert("Please Last Name");
        return;
      }
    }

    return (
      <View style={styles.container}>
        <Avatar
        rounded
        containerStyle={{ backgroundColor: '#ff8c00' }}
        />
        <Text style={styles.titleText}>More Information</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.Infotext}>First Name: </Text>
            <TextInput
              style={styles.Infotext}
              onChangeText={(value) => this.chkFirstName(value)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                refLastName.current.focus();
              }}
              >
              {FirstNm}
            </TextInput>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.Infotext}>Last Name: </Text>
            <TextInput
              style={styles.Infotext}
              onChangeText={(value) => this.chkLastName(value)}
              returnKeyType="next"
              blurOnSubmit={false}
              ref={refLastName}
              onSubmitEditing={() => {
                refEmail.current.focus();
              }}
              >
              {LastNm}
            </TextInput>
          </View>
        </View>
        <Text style={styles.titleText}>Sub Information</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.Infotext}>Email: </Text>
            <TextInput
              style={styles.Infotext}
              returnKeyType="next"
              blurOnSubmit={false}
              ref={refEmail}
              onSubmitEditing={() => {
                refPhone.current.focus();
              }}
            >
              {Email}
            </TextInput>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.Infotext}>Phone: </Text>
            <TextInput
              style={styles.Infotext}
              returnKeyType="next"
              ref={refPhone}
              blurOnSubmit={false}
            >
              {Phone}
            </TextInput>
          </View>
        </View>
      </View>
    );
  }

export default createStackNavigator({
  Contact: ContactList,
  Detail: ContactDetail,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize:24
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  Infotext: {
    fontSize: 15
  },
});
