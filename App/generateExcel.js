import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';

export default function GenerateExcel() {

  const [data, setData] = useState('');

  const getData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('@storage_Key')
      setData(JSON.parse(jsonValue))
      return JSON.parse(jsonValue);
    } catch(e) {
      console.log('error:' + e)
    }
  }

  useEffect(() => {
    if (data != '') {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.aoa_to_sheet(data);
  
      XLSX.utils.book_append_sheet(wb,ws,"excelShifterPro", true);
  
      const base64 = XLSX.write(wb, { type: "base64" });
      const filename = FileSystem.documentDirectory + "ShifterPro.xlsx";
      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
      })
      .then(() => {
        Sharing.shareAsync(filename);
      })
    }
  },[data])

    return (
        <TouchableOpacity onPress={getData}><Text>Generate Excel</Text></TouchableOpacity>
    )
}