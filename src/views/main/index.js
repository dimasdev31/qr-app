import React, { useState, useRef, useEffect } from 'react';

import { Text, View, Platform, StyleSheet } from 'react-native';
import { Card, Button, Image } from 'react-native-elements';
import { Input } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { LinearGradient } from 'expo-linear-gradient';

import * as ImagePicker from 'expo-image-picker';


const Main = ({ navigation }) => {  
 
    const [date, setDate] = useState(new Date(1598051730000));
    const [nama, setName] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [perihal, setPerihal] = useState('');    
    const [image, setImage] = useState(null); // Buat preview

    const [mode, setMode] = useState('date');    
    const [show, setShow] = useState(false);

    const dateInput = useRef(null); 
    const namaInput = useRef(null);
    const jabatanInput = useRef(null);
    const perihalInput = useRef(null);    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,            
        });


        if (!result.cancelled) {
            setImage(result.uri);
            // setImageQr(result.base64);  
            console.log(result.uri);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = format(new Date(selectedDate), 'yyyy-MM-dd') || format(new Date(date), 'yyyy-MM-dd');
        setShow(Platform.OS === 'ios');
        setDate(currentDate);    
        
        dateInput.current.setNativeProps({ text: currentDate}); 
    };

    const onSubmit = () => { 
        if(!nama) {
            return namaInput.current.shake();
        }
        if(!jabatan) {
            return jabatanInput.current.shake();
        }
        if(!date) {
            return dateInput.current.shake();
        }
        if(!perihal) {
            return perihalInput.current.shake();
        }
        navigation.push('OutputQr', {data:[    
            {data: nama.concat('#'), mode: 'byte'},
            {data: jabatan.concat('#'), mode: 'byte'},
            {data: date.concat('#'), mode: 'byte'},
            {data: perihal.concat('#'), mode: 'byte'},
            {data: image || '', mode: 'byte'},
        ]});
    };
 
    const showOverlay = () => {
        setShow(true);
    };

    return(
        <LinearGradient        
            colors={['#fc466b', '#3f5efb']}
            style={styles.linearGradient}
        >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>            
                <Card containerStyle={{ borderRadius: 20 }}>
                    <Card.Title h3>PERSERO BATAM BERAKHLAK</Card.Title>

                    <Input
                        ref={namaInput}
                        placeholder='Nama Lengkap'     
                        onChangeText={value => setName(value)}           
                    />
                    <Input
                        ref={jabatanInput}
                        placeholder='Jabatan'
                        onChangeText={value => setJabatan(value)}
                    />     
                    <Input
                        ref={dateInput}
                        placeholder='Tanggal Pembuatan'                           
                        onFocus={showOverlay}
                        rightIcon={
                            <Icon
                                name='calendar-month'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}   
                    <Input
                        ref={perihalInput}
                        placeholder='Perihal' 
                        onChangeText={value => setPerihal(value)}               
                    />
                    
                    <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        {   image == null ?
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 200, height: 100, marginBottom: 10, borderWidth: 3, borderColor: '#bdbdbd' }}>
                                <Text style={{ fontWeight: 'bold', color: '#eeeeee', fontSize: 42 }}>TTD</Text>
                            </View>
                            :
                            <Image source={{ uri: image }} style={{ width: 200, height: 100, marginBottom: 10, borderWidth: 3, borderColor: '#bdbdbd' }} />
                        }
                        <Button
                        title="Upload Document" 
                        onPress={pickImage}
                        icon={
                            <Icon
                                name="upload"
                                size={15}
                                color="white"
                                style={{marginRight: 10}}
                            />
                        }
                        />                    
                    </View>
                    
                    <Button                  
                        title="Generate"
                        onPress={onSubmit}
                    />

                </Card>
                
            </View>
        </LinearGradient>
    )

}  

const styles = StyleSheet.create({    
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,  
        bottom: 0,      
        width: '100%',
        height: '100%',
        opacity: 0.95,            
    },    
})
  

export default Main