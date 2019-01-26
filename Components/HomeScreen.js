import React from "react";
import {View,Text,FlatList,TouchableOpacity,Platform,PermissionsAndroid,Image,Button} from 'react-native';
import styles from "../Stylesheet/styleSheet";
import Contacts from 'react-native-contacts';
import firebase from '../firebase/firebase';

export default class HomeScreen extends React.Component {
    state = {
        contacts:[]
    };
    async requestContactsPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            return Platform.OS === "ios" ? true : false;
        }
    }
    async componentDidMount() {
        const permission = await this.requestContactsPermission();
        if (!permission) {
            alert(permission);
            return;
        }
        let db = firebase.database();
        let localContacts = [];
        Contacts.getAll((err, contacts) => {
            if (err) throw err;
            else {
                db.ref("registeredUsers").once('value', (registeredUsers) =>  {
                    for(let i=0;i<contacts.length;i++) {
                        if(contacts[i].phoneNumbers.length!==0) {
                            const number = contacts[i].phoneNumbers[0].number.replace(/\D/g,'');
                            if (number) {
                                if (number && registeredUsers.hasChild(number)) {
                                    localContacts.push({
                                        key: number,
                                        name: contacts[i].givenName
                                    })
                                }
                            }
                        }
                    }
                    this.setState({
                        contacts:localContacts
                    })
                });
            }
        })
    }
    renderName(contact) {
        let info={
            sender:this.props.navigation.getParam("sender"),
            receiver:contact
        }
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen',{info:info,contactName:contact.item.name})} style={styles.separator}>
                <Text style={styles.item}> {contact.item.name} </Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <View style={styles.leftHeaderContainer}>
                        <Text style={styles.logoText}>Sollu</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage')}>
                            <Image style={styles.iconContainer} source={require('../Icon/userIcon1.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.contacts}
                    renderItem={this.renderName.bind(this)}
                    extradata={this.state.contacts}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                />
            </View>
        );
    }
}

