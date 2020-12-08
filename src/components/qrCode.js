import React, { useEffect, useState } from 'react';
import { ToastAndroid } from "react-native";

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


import SvgQRCode from 'react-native-qrcode-svg';

const QrCode = (props) => {    
    const [image, setImage] = useState('');       

    useEffect(() => {
        console.log(props.value);
    })

    const showToast = () => {
        ToastAndroid.show("QrCode berhasil di simpan ke dalam galeri !", ToastAndroid.LONG);
    };    

    const saveQrToDisk = async (svg) => {
        try  {
            svg.toDataURL(async (data) => {
                let fileUri = FileSystem.documentDirectory + "qr-code.png";
                await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                await MediaLibrary.createAlbumAsync("Data QR", asset, false);
                showToast();
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <SvgQRCode value={props.value} size={250} getRef={(c) => saveQrToDisk(c)} />        
    )    
};

export default QrCode; 
