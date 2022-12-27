
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MyMenu from './Component/Button';

import { Picker } from '@react-native-picker/picker';


export default function App() {

  // Nombre de shift
  // La durée de la journée entière

  // set End ? 

  const [shiftBegin, setShiftBegin] = useState(0);
  const [shiftEnd, setShiftEnd] = useState(0);
  const [textValue, settextValue] = useState("Start");
  const [count, setCount] = useState(1);

  const [totalAllShift, setTotalAllShift] = useState(0);

  const [newShift, setNewShift] = useState(false)
  const [end, setEnd] = useState(false)

  const [shift_1_Begin, setShift_1_Begin] = useState(0);
  const [shift_1_End, setShift_1_End] = useState(0);
  const [shift_1_Time, setShift_1_Time] = useState(0);

  const [shift_2_Begin, setShift_2_Begin] = useState(0);
  const [shift_2_End, setShift_2_End] = useState(0);
  const [shift_2_Time, setShift_2_Time] = useState(0);

  const [jour_Complet, setJour_Complet] = useState(true);
  const [data, setData] = useState('');

  const [showPrompt, setShowPrompt] = useState(false);
  const [time, setTime] = useState(new Date());

  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedTime, setSelectedTime] = useState(`${selectedHour}:${selectedMinute}`);

  useEffect(() => {
    setSelectedTime(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute]);

  const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];


  const DayEnd = () => {
    var today = new Date();
    const todayDate = today.toLocaleDateString()

    const storeData = async () => {
      const dataArray = []
      dataArray.push(todayDate, JSON.stringify(shift_1_Begin),JSON.stringify(shift_1_End),shift_1_Time,shift_2_Begin,shift_2_End,shift_2_Time)
      jour_Complet ? dataArray.push('07:00','07:00') : dataArray.push(0,totalAllShift)
      try {
        let jsonValue = await AsyncStorage.getItem('@storage_Key')
        let alldata
        if (jsonValue === null) {
          alldata = []
          alldata.push(["Date","Shift_1_Begin","Shift_1_End","Shift_1_Time","Shift_2_Begin","Shift_2_End","Shift_2_Time","Jour_Complet","Total_Time"])
        } else {
          alldata = JSON.parse(jsonValue)
        }
        console.log(alldata)
        console.log(dataArray)
        alldata.push(dataArray)
        let jsonAllData = JSON.stringify(alldata)
        await AsyncStorage.setItem('@storage_Key',jsonAllData)
        .then(()=> resetall())
      } catch (e) {
        console.log('error :' + e)
      }
    }

    storeData()

  }

  function timeChangeStart() {
    if (count === 1) {
      setShift_1_Begin (selectedTime)
    } else {
      setShift_2_Begin (selectedTime)
    }
    setShiftBegin((Number(selectedHour)*60) + (Number(selectedMinute)))
    settextValue("End")
    setJour_Complet(false)
    setShowPrompt(false)
  }

  function timeChangeEnd() {
    if (count === 1) {
      setShift_1_End (selectedTime)
    } else {
      setShift_2_End (selectedTime)
    }
    setShiftEnd((Number(selectedHour)*60) + (Number(selectedMinute)))
    settextValue("Start")
    setNewShift(true)
    setShowPrompt(false)
  }


  function Timestamp() {
    
    var today = new Date();
    const time = today.toLocaleTimeString().slice(0,5);

    if (textValue === 'Start') {
      if (count === 1) {
        setShift_1_Begin(time)
      } else {
        setShift_2_Begin(time)
      }
      setShiftBegin((today.getHours()*60)+today.getMinutes())
      settextValue("End")
      setJour_Complet(false)
      setEnd(true)
    } else {

      setShiftEnd((today.getHours()*60)+today.getMinutes())
      if (count === 1) {
        setShift_1_End(time)
      } else {
        setShift_2_End(time)
      }
      settextValue("Start")
      setNewShift(true)
      
    }
    
  }

  function resetall () {
    setCount (1)
    settextValue("Start")
    setShiftBegin(0)
    setShift_1_Begin(0)
    setShift_1_End(0)
    setShift_1_Time(0)
    setShift_2_Begin(0)
    setShift_2_End(0)
    setShift_2_Time(0)
    setShiftEnd(0)
    setNewShift(false)
    setJour_Complet(true)
    setData('')
  }
  
  function newShiftreset () {
    setCount(count + 1)
    setShiftBegin(0)
    setShiftEnd(0)
    setNewShift(false)
    setEnd(false)
  }

  useEffect(() => {
    var hours = Math.floor((shiftEnd - shiftBegin) / 60)
    var minutes = (shiftEnd - shiftBegin) % 60
    const date = new Date()
    if (count === 1) {
      const formatedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
      // setShift_1_Time(( hours < 10 ? '0':'') + hours + ':' + (minutes < 10 ? '0':'') + minutes)
      setShift_1_Time(formatedTime)
    } else {
      const formatedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
      setShift_2_Time(formatedTime)
      // setShift_2_Time(( hours < 10 ? '0':'') + hours + ':' + (minutes < 10 ? '0':'') + minutes)
    }
  },[shiftEnd]);

  useEffect (() => {
    let hours1 = Number(shift_1_Time.toString().slice(0,2))
    let minutes1 = Number(shift_1_Time.toString().slice(3,5))

    let hours2 = Number(shift_2_Time.toString().slice(0,2))
    let minutes2 = Number(shift_2_Time.toString().slice(3,5))

    let hourstot = hours1+hours2
    let minutestot = minutes1+minutes2

    if (minutestot > 60) {
      minutestot = minutestot -60 
      hourstot = hourstot + 1
    }

    const formatedTime = `${hourstot < 10 ? '0' : ''}${hourstot}:${minutestot < 10 ? '0' : ''}${minutestot}`


    setTotalAllShift(formatedTime)

  },[shift_1_Time, shift_2_Time])



  
  return (
    <View style={styles.container}>
    
        <Text style={styles.sectionTitle}>Shifter Pro</Text>

        <MyMenu/>

        <View style={styles.morningShift}>


          <View style={styles.button_View}>
            {newShift ? <TouchableOpacity
              style={styles.button_Principal}
              onPress={newShiftreset}
              accessibilityLabel="Button to start a new Shift"
            >
             <Text style={styles.button_Text}>New Shift</Text>
            </TouchableOpacity> : 
            <TouchableOpacity
              style={styles.button_Principal}
              onPress={Timestamp}
              accessibilityLabel="Button to start or end the shift"
            >
              <Text style={styles.button_Text}>{textValue}</Text>
            </TouchableOpacity>}
          </View>

          <Modal visible={showPrompt}>
            <View>
              <Text>Entrez une nouvelle heure :</Text>
              <Picker
                selectedValue={selectedHour}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {hours.map((hour) => (
                  <Picker.Item label={hour} value={hour} key={hour} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedMinute}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
              >
                {minutes.map((minute) => (
                  <Picker.Item label={minute} value={minute} key={minute} />
                ))}
              </Picker>
              <Text>Heure sélectionnée : {selectedTime}</Text>
              {textValue === 'Start' ? <TouchableOpacity
                style={styles.button_Principal}
                onPress={timeChangeStart}
              ><Text>Enregistrer</Text></TouchableOpacity> : <TouchableOpacity
                style={styles.button_Principal}
                onPress={timeChangeEnd}
              ><Text>Enregistrer</Text></TouchableOpacity>}
            </View>
          </Modal>

          <View style={styles.start_end}>

            {count === 1 ?  <Text onPress={() => {
              if (textValue === 'Start'){
                setShowPrompt(true)
              }
            }} style={styles.start_end_text}>START{"\n"} {shift_1_Begin}</Text> :  <Text onPress={() => {
              if (textValue === 'Start'){
                setShowPrompt(true)
              }
            }} style={styles.start_end_text}>START{"\n"} {shift_2_Begin} </Text>}

            {count === 1 ?  <Text onPress={() => {
              if (textValue === 'End'){
                setShowPrompt(true)
              } 
            }} style={styles.start_end_text}>END{"\n"} {shift_1_End} </Text> :  <Text onPress={() => {
              if (textValue === 'End'){
                setShowPrompt(true)
              } 
            }} style={styles.start_end_text}>END{"\n"} {shift_2_End}</Text>}
          </View>

          <View>
            {count === 1 ?  <Text style={styles.sectionTitle}>TOTAL{"\n"} {shift_1_Time}</Text> :  <Text style={styles.sectionTitle}>TOTAL{"\n"} {shift_2_Time}</Text>}
          </View>

          <View><Text>{totalAllShift}</Text></View>

          <View style={styles.button_View}>
            {jour_Complet ? <TouchableOpacity
              style={styles.button_Secondaire}
              onPress={DayEnd}
              accessibilityLabel="Button to start a new Shift"
            ><Text style={styles.button_Text}>Jour Complet</Text></TouchableOpacity> : null}
            <TouchableOpacity
              style={styles.button_Secondaire}
              onPress={DayEnd}
              accessibilityLabel="End the day and POST all shifts"
            ><Text style={styles.button_Text}>Day END</Text></TouchableOpacity>
          </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  sectionTitle: {
    marginTop:20,
    textAlign:'center',
  },
  start_end: {
    flexDirection:'row',
    margin: 10,
  },
  start_end_text: {
    textAlign:'center',
    flex:1,
  },
  button_View: {
    alignItems:'center',
    flexDirection:'row-reverse',
    justifyContent:'center',
    margin: 50
    
  },
  button_Principal: {
    height:100,
    width:100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    elevation: 3,
    backgroundColor: 'rgb(0, 138, 230)',
  },
  button_Secondaire: {
    backgroundColor: 'rgb(0, 138, 230)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:30,
    marginRight:30,
    height:100,
    width:100,
    borderRadius:100
  },
  button_Text:{
    color:'white'
  }
});
