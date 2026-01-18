import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import {datasource} from'./Data.js';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    inputStyle: {
        padding: 15,
        marginTop: 10
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center",
    },
    buttonStyle: {
        backgroundColor: '#E07B58',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        width: 150,
        marginTop: 10,
        marginBottom: 50
    },
    opacityStyle: {
        borderWidth: 1,
        margin: 15
    },
    titleStyle: {
        fontSize: 27,
        margin: 10,
        textAlign: 'left',
        flex:3,
        fontWeight: 'bold',
    },
    headerText: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4B3F39',
        marginTop: 35,
        marginBottom: 20,

    },
    editButtonStyle: {
        backgroundColor: '#E07B58',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        borderRadius: 50,
    },
    returnButtonStyle: {
        backgroundColor: '#E07B58',
        alignItems: 'center',
        padding: 10,
        margin: 15,
        borderRadius: 50,
        marginTop:30
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
    inputTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});


const Add = ({navigation, route}) => {
    const [type, setType] = useState('FRUITS & VEGETABLES');

    const [name, setName] = useState('Product Name');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [img, setImg] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtxFPba6Y0P7mzR31-xVAlnDrRyIHqilWBFs0YemVGA&s');
    const [units, setUnits] = useState('units');
    const [notes, setNotes] = useState('notes');

    const setData = async(value) => {
        AsyncStorage.setItem("shopdata", value);
        navigation.navigate("Home");
    }

    return (
        <ScrollView style={{marginTop: 40, flexDirection:'column'}}>
            <TouchableOpacity style={styles.returnButtonStyle} onPress={() => {navigation.navigate("Home")}}>
                <Text style={styles.buttonTextStyle}>
                    RETURN TO SHOPPING LIST
                    <Text> </Text>
                    <FontAwesome6 name="arrow-alt-circle-left" size={25} color="white" />
                </Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Item View</Text>
            <View style={[styles.opacityStyle]}>
                <View style={styles.cardStyle}>
                    <Image source={{uri: img}} style={styles.imgStyle} />
                    <Text style={{flex: 1, margin: 10, marginLeft:15}}>
                        <Text style={styles.titleStyle}>{name}{"\n"}</Text>
                        <Text style={styles.textStyle}>{quantity} {units}{"\n"}</Text>
                        <Text style={styles.priceStyle}>${price.toFixed(2)}{"\n"}</Text>
                        <Text style={styles.textStyle}>{"\n"}*{notes}</Text>
                    </Text>
                    <TouchableOpacity style={styles.editButtonStyle}>
                        <Text style={styles.buttonTextStyle}>
                            <FontAwesome6 name="edit" size={25} color="white" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputStyle}>
                <Text style={styles.inputTextStyle}>Type:</Text>
                <View style={{borderWidth: 1}}>
                <Picker style={{backgroundColor:'white'}} onValueChange={ (value) => setType(value)}>
                    <Picker.Item label='FRUITS & VEGETABLES' value='FRUITS & VEGETABLES'/>
                    <Picker.Item label='MEAT & SEAFOOD' value='MEAT & SEAFOOD'/>
                    <Picker.Item label='DAIRY & EGGS' value='DAIRY & EGGS'/>
                </Picker>
                </View>
            </View>

            <View style={styles.inputStyle}>
            <Text style={styles.inputTextStyle}>Product Name: </Text>
            <TextInput style={{borderWidth: 1, backgroundColor:'white'}} onChangeText={ (text) => setName(text)} />
            </View>

            <View style={styles.inputStyle}>
            <Text style={styles.inputTextStyle}>Price: </Text>
            <TextInput style={{borderWidth: 1, backgroundColor:'white'}} onChangeText={ (num) => setPrice(Number(num))} />
            </View>

            <View style={styles.inputStyle}>
            <Text style={styles.inputTextStyle}>Quantity: </Text>
            <TextInput style={{borderWidth: 1, backgroundColor:'white'}} onChangeText={ (num) => setQuantity(Number(num))} />
            </View>

            <View style={styles.inputStyle}>
            <Text style={styles.inputTextStyle}>Image URL: </Text>
            <TextInput style={{borderWidth: 1, backgroundColor:'white'}} onChangeText={ (text) => setImg(text)} />
            </View>

            <View style={styles.inputStyle}>
                <Text style={styles.inputTextStyle}>Units: </Text>
                <TextInput style={{borderWidth: 1, backgroundColor:'white'}} onChangeText={ (text) => setUnits(text)} />
            </View>

            <View style={styles.inputStyle}>
                <Text style={styles.inputTextStyle}>Notes: </Text>
                <TextInput style={{borderWidth: 1, backgroundColor:'white'}} onChangeText={ (text) => setNotes(text)} />
            </View>

            <View style={{alignItems: 'center', marginTop: 30}}>
                <TouchableOpacity style={[styles.buttonStyle, { marginRight: 10 }]} onPress={
                    () => {
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {
                            name: name,
                            price: price,
                            quantity: quantity,
                            img: img,
                            units: units,
                            notes: notes};
                        let indexnum = 2;
                        if(type === 'FRUITS & VEGETABLES'){
                            indexnum = 0;
                        } else if(type === 'MEAT & SEAFOOD'){
                            indexnum = 1;
                        }
                        mydata[indexnum].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                    }}>
                    <Text style={styles.buttonTextStyle}>
                        SUBMIT
                        <Text>  </Text>
                        <FontAwesome6 name="check" size={25} color="white" />
                    </Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
}

export default Add;