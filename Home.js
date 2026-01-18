import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, SectionList, Image, Button, Alert} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {datasource} from'./Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    opacityStyle: {
        borderWidth: 1,
    },
    titleStyle: {
        fontSize: 27,
        margin: 10,
        textAlign: 'left',
        flex:3,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },

    headerText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4B3F39',
        marginTop: 10,

    },

    addButtonStyle: {
        backgroundColor: '#E07B58',
        alignItems: 'center',
        padding: 10,
        margin: 30,
        borderRadius: 50,
        marginLeft: 120,
        marginRight: 120,
    },

    editButtonStyle: {
        backgroundColor: '#E07B58',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        borderRadius: 50,
    },

    summaryButtonStyle: {
        backgroundColor: '#E3C565',
        alignItems: 'center',
        padding: 10,
        margin: 30,
        borderRadius: 50,
        marginLeft: 120,
        marginRight: 120,

    },

    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },

    sumbuttonTextStyle: {
        color: '#4B3F39',
        fontWeight: 'bold',
        fontSize: 20,
    },

    imgStyle: {
        width: 100,
        height: 100,
        padding:50,
    },

    cardStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',

    },

    textStyle: {
        fontSize: 20,
        textAlign: 'left',
        padding: 10,
    },

    priceStyle: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 30,
        color:'red',
        fontWeight: 'bold',

    },

    footerStyle: {
        fontSize:30,
        textAlign: 'center',
        color:'#4B3F39',
        fontWeight: 'bold',
        margin: 50,
        paddingBottom: 20,

    },
});


// Amend code to display header icon etc
const Home = ({navigation}) => {
    const [mydata, setMydata] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('shopdata');
        if (datastr != null) {
            let jsondata = JSON.parse(datastr);
            setMydata(jsondata)
        }
        else {
            setMydata(datasource);
        }
    };

    getData();

    let totalItems = 0;
    let totalPrice = 0;

    mydata.forEach(section => {
        section.data.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.quantity * item.price;
        });
    });

    const renderItem = ({item, index, section}) => {

        return (
                <View style={[styles.opacityStyle]}>
                <View style={styles.cardStyle}>
                    <Image source={{uri: item.img}} style={styles.imgStyle} />
                    <Text style={{flex: 1, margin: 10, marginLeft:15}}>
                    <Text style={styles.titleStyle}>{item.name}{"\n"}</Text>
                    <Text style={styles.textStyle}>{item.quantity} {item.units}{"\n"}</Text>
                    <Text style={styles.priceStyle}>${Number(item.price).toFixed(2)}{"\n"}</Text>
                    <Text style={styles.textStyle}>{"\n"}*{item.notes}</Text>
                    </Text>
                    <TouchableOpacity style={styles.editButtonStyle} onPress={() => {
                        let datastr = JSON.stringify(mydata)
                        navigation.navigate("Edit", {
                        datastring:datastr,
                        index:index,
                        type:section.title,
                        name:item.name,
                        price:item.price,
                        quantity:item.quantity,
                        img:item.img,
                        units:item.units,
                        notes:item.notes,
                    })}}>
                        <Text style={styles.buttonTextStyle}>
                            <FontAwesome6 name="edit" size={25} color="white" />
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>

        );
    };

    return (
        <View style={{marginTop: 50, marginBottom: 50, backgroundColor: 'white'}}>
            <Text style={styles.headerText}>My Shopping List</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>

            <TouchableOpacity style={[styles.addButtonStyle, { marginRight: 10 }]} onPress={() => {
                let datastr = JSON.stringify(mydata)
                navigation.navigate("Add", {datastring:datastr})}}>
                <Text style={styles.buttonTextStyle}>
                    ADD ITEMS
                    <Text>  </Text>
                    <FontAwesome6 name="add" size={20} color="white" />
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.summaryButtonStyle, { marginLeft: 10 }]} onPress={() => {Alert.alert(
                "Shopping Summary",
                `Total Items: ${totalItems}\nTotal Price: $${totalPrice.toFixed(2)}`,
                [{ text: "OK" }]
            )}}>
                <Text style={styles.sumbuttonTextStyle}>
                    SHOW SUMMARY
                    <Text>  </Text>
                    <FontAwesome6 name="note-sticky" size={20} color="#4B3F39" />
                </Text>
            </TouchableOpacity>

            </View>

            <SectionList
                contentContainerStyle={{padding:20, paddingBottom:150, backgroundColor: 'white', borderTopWidth:1}}
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={ ( {section: {title, bgcolor, icon, iconcolor, textcolor}}) => (
                    <Text style={ [styles.labelText, {backgroundColor: bgcolor, borderWidth: 1, padding:5, color: textcolor, borderRadius: 5, marginTop:50} ] }>
                        <FontAwesome6 name={icon} size={25} color={iconcolor} />
                        <Text> </Text>
                        {title}
                    </Text>
                )}
                ListFooterComponent={<Text style={styles.footerStyle}>~ End of List ~</Text>}
            />
        </View>
    );
};

export default Home;
