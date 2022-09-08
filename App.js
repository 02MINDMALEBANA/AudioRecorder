

import { StyleSheet, Text, View , Button, Image, requireNativeComponent } from 'react-native';
import{ Audio} from 'expo-av'
import * as React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient'


export default function App() {
  //https://www.youtube.com/watch?v=70K6QL0lYRQ

const [recording, setRecording]= React.useState();
const [recordings, setRecordings]= React.useState([]);
const [message, setMessage]= React.useState("");

async function startRecording() {
    try{
        const permission= await Audio.requestPermissionsAsync();
        if (permission.status ==='granted'){
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true

            });
            const {recording} = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording)
        }else{
            setMessage("please grant permission to app access microphone")
        }
    }catch(err){
        console.error('failed to start recording', err)
    }
  
}

async function stopRecording(){
    setRecording(undefined)
    await recording.stopAndUnloadAsync();

    //get recordings
    let updateRecordings =[...recordings]
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updateRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
    });
    setRecordings(updateRecordings); 
}

//function to get duration
function getDurationFormatted(millis){
    const minutes=millis / 1000 / 60;
    const minutesDisplay=Math.floor(minutes);
    const seconds=Math.round((minutes-minutesDisplay) *60);
    const secondsDisplay=seconds< 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
}

function getRecordingLines(){
    return recordings.map((recordingLine, index)=>{
        return(
            <View key={index} style={styles.row}>
                <Text style={styles.fill}> Recording {index + 1} - {recordingLine.duration}</Text>
                <Button style={styles.button} onPress={()=>recordingLine.sound.replayAsync()} title="play"></Button>
            </View>
        )
    });
}

  return (
    <LinearGradient style={{height:"100%"}}  colors={['#3522c3', '#bc2dfd',]}>
          <View style={styles.container}>
      
      <View>
        <Image
          style={{width: 150, height: 150, borderRadius:'50%'}}
          source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFSV156n1wqIy5xly4uiPcqQfNCoGGpx7KA&usqp=CAU"}
        />
      </View>
      <Text>{message}</Text>
      <Button
         title={recording ? 'Stop recording' : 'Start recording' }
         onPress={recording? stopRecording : startRecording}
         />
           {getRecordingLines()}
      {/* <LinearGradient
         // Button Linear Gradient
      
         style={styles.button1}
      >
         <Button
         title={recording ? 'Stop recording' : 'Start recording' }
         onPress={recording? stopRecording : startRecording}
         />
          {getRecordingLines()}

      </LinearGradient> */}
      
     
    </View>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#bc2dfd',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  row:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',

  },
  fill:{
    flex:1,
    margin: 16
  },
  button:{
    margin:16
  }
});


























// import { StyleSheet, Text, View , Button } from 'react-native';
// import{ Audio} from 'expo-av'
// import * as React from 'react'

// export default function App() {
//   //https://www.youtube.com/watch?v=70K6QL0lYRQ

// const [recording, setRecording]= React.useState();
// //
// const [message, setMessage]= React.useState();

// async function startRecording() {
//   try{
//     console.log('Requesting Submission...');
//     await Audio.requestPermissionsAsync();
//     await Audio.setAudioModeAsync({
//       allowsRecordingIOS: true,
//       playsInSilentModeIOS: true,

//     });
//     console.log('Start recording...')
//     const recording= new Audio.Recording();
//     await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
//     await recording.startAsync();
//     setRecording(recording);
//     console.log('recording Started')
//   }catch (err){
//     console.error('failed to start recording', err)
//   }
// }

// async function stopRecording(){
//   console.log('Stopping recording...');
//   setRecording(undefined);
//   await recording.stopAndUnloadAsync();
//   const uri=recording.getURI();
//   console.log('Recording stopped and stored at', uri);


  
// }

//   return (
//     <View style={styles.container}>
//       <Text>{message}</Text>
//       <Button
//          title={recording ? 'Stop recording' : 'Start recording' }
//          onPress={recording? stopRecording : startRecording}
//       />
  
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
