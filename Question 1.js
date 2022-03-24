import React from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, RefreshControl, TouchableOpacity, KeyboardAvoidingView, Platform, Button, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Conct from '/data.json';
var detData = [];

const ContactInfo = Conct

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contact: ContactInfo,
      refreshing: false
    };
  }

  contactName = (item) => {
    return <Text style={styles.text} onPress={()=> this.props.navigation.navigate('Detail', {Contact: item})}>{item.firstName} {item.lastName}</Text>;
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
  constructor() {
    super();
    this.state = {
      fName: "",
      lName: ""
    };
  }

onSave = () => {
      if (this.state.fName.length < 0) {
        Alert.alert("Please Enter First Name");
        return;
      } else if (this.state.lName.length < 0) {
        Alert.alert("Please Enter Last Name");
        return;
      }
    }

  render() {
    const ContactDet = this.props.route.params.Contact;

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

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        >
        <Avatar
        rounded
        size = "medium"
        containerStyle={{ backgroundColor: '#ff8c00', marginBottom: 25 }}
        />
        <Text style={styles.titleText}>More Information</Text>
        <View>
          <View style={{ flexDirection: 'row' }}>
              <TextInput
                editable={false}
                style={[styles.Infotext, {paddingRight: 20}]}
                disabledInputStyle={{opacity: 1, color: 'black' }}
               >
                First Name:
               </TextInput>
              <TextInput
                style={styles.Infotext}
                onChangeText={value => this.setState({ fName: value })}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.LastName.focus();
                }}
              >
                {FirstNm}
              </TextInput>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
          editable={false}
          style={[styles.Infotext, {paddingRight: 20}]}
          disabledInputStyle={{opacity: 1}}
          >
            Last Name:
          </TextInput>
          <TextInput
              style={styles.Infotext}
              onChangeText={(value) => this.setState({ lName: value })}
              returnKeyType="next"
              blurOnSubmit={false}
              ref={ref => {
                this.LastName = ref;
              }}
              onSubmitEditing={() => {
                this.Email.focus();
              }}
              >
              {LastNm}
          </TextInput>
        </View>
        <Text style={styles.titleText}>Sub Information</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            editable={false}
            style={[styles.Infotext, {paddingRight: 20}]}
            disabledInputStyle={{opacity: 1, color: 'black' }}
            >
              Email:
          </TextInput>
          <TextInput
              style={styles.Infotext}
              onChangeText={(value) => this.setState({ emailDet: value })}
              returnKeyType="next"
              blurOnSubmit={false}
              ref={ref => {
                this.Email = ref;
              }}
              onSubmitEditing={() => {
                this.Phone.focus();
              }}
            >
              {Email}
          </TextInput>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            editable={false}
            style={[styles.Infotext, {paddingRight: 20}]}
            disabledInputStyle={{opacity: 1, color: 'black' }}
            >
              Phone:
          </TextInput>
          <TextInput
              style={styles.Infotext}
              returnKeyType="next"
              onChangeText={(value) => this.setState({ phoneDet: value })}
              ref={ref => {
                this.Phone = ref;
              }}
              blurOnSubmit={false}
            >
              {Phone}
            </TextInput>
        </View>
        <Button
          style={styles.button}
          title="Save"
          onPress={this.onSave}
        />
      </KeyboardAvoidingView>
    );
  }
  }

const Stack = createStackNavigator ();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={ContactList} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize:24
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  Infotext: {
    fontSize: 15,
    borderColor: "#000000"
  },
});
