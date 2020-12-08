import React, { useEffect } from 'react';

import { View } from 'react-native';

import QrCode from '../../components/qrCode';

const OutputQr = ({ route, navigation }) => {    

    const { data } = route.params;
    
    useEffect(() => {
        // console.log(data)
    })

    return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>             
            <QrCode value={data} />
         </View>
    )
}

export default OutputQr;
