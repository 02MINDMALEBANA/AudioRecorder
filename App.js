

import { StyleSheet, Text, View , Button, Image, requireNativeComponent, Pressable} from 'react-native';
import{ Audio} from 'expo-av'
import * as React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
// import Wave from 'react-native-waveview';




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
            <View style={styles.headingV}><Text style={styles.heading}>Voice Recorder</Text></View>
            
      
      <View style={styles.picture}>
        <Image
          style={{width: 180, height: 180, borderRadius:'50%', marginTop:'-50%'}}
          source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEFSV156n1wqIy5xly4uiPcqQfNCoGGpx7KA&usqp=CAU"}
        />
        <Image
            style={{width:200, height:70, marginTop:'30px', marginBottom:'20px'}}
            // source={"https://miro.medium.com/max/1200/0*vr9CgUKm35izlY5U.gif"}
            source={"https://th.bing.com/th/id/R.d37b6d142b1bde0b0816e13a344dfc29?rik=%2f0mYYyODmIfGZA&pid=ImgRaw&r=0"}
        />
      </View>
      <Text>{message}</Text>

        <Pressable onPress={recording ? stopRecording : startRecording}>
          <LinearGradient style={{borderRadius:20}} colors={['#09cbeb', '#090979', '#00d4ff']}>
            <View style={styles.record}>

              <Text style={{ color: 'white', fontSize: '15px', fontWeight: 'bold',margin:7, marginLeft:'20px',marginTop:'10px'}}>{recording ? 'Stop recording' : 'Start recording'}</Text>

            </View>
          </LinearGradient>

          {getRecordingLines()}

        </Pressable>
      
      {/* <Button
       color='#4d9a9c'    
        style={{width:'100px'}}
         title={recording ? 'Stop recording' : 'Start recording'} 
         onPress={recording? stopRecording : startRecording}
         
         />
           {getRecordingLines()} */}


           {/* <WaveView
     height={50}
     width={wp('80%')}
     waveColor={'#0ff'}
     waveSpeed={'slow'}
     waveAmplitude={20}
     noOfWaves={70}
     wavePosition={'both'}
     style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
    /> */}
       
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
  headingV:{
    marginBottom: 400,
  },
  heading:{
    marginTop: 0,
    color:'white',
    fontSize:'40px',
    // fontWeight:'bold',
  },
  picture:{
    marginTop: '-70%',
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
  },
  record:{
    // borderWidth:3,
    width:150,
    height:50,
    borderRadius: 20,
    
    // borderBottomLeftRadius:15
  
    
    
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
