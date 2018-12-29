import React from "react";
import styles from "../Stylesheet/styleSheet";
import {View,Text,FlatList,TouchableOpacity,} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            ChatListContacts:[
                {name: 'Ranga'},
                {name: 'Harika'},
                {name: 'Hema'},
                {name: 'Manoj'},
                {name: 'Harish'},
                {name: 'Katta'},
            ]
        };
    }
    renderName = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Details',{"name":item.name})} style={styles.separator}>
                <Text style={styles.item}> {item.name} </Text>
            </TouchableOpacity>
        );
    }

    static navigationOptions = ({ navigation }) => {
        return(
            {
                headerTitle: 'P2PApp',
                headerBackTitle:"Back"
            }
        );
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <FlatList
                    data={this.state.ChatListContacts}
                    renderItem={this.renderName}
                />


            </View>
        );
    }
}

