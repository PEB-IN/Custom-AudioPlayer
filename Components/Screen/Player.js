import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
// import img1 from '../../assets/image/img1.jpg';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import songs from '../Songs';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const width = Dimensions.get('window').width;
const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
  } catch (e) {
    console.log(e);
  }
};

const togglePayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};
const Player = () => {
  const playBackState = usePlaybackState();
  const [songindex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({value}) => {
      // console.log(`ScrollX : ${value} | Device Width : ${width}`);
      const index = Math.round(value / width);
      setSongIndex(index);
      // console.log(index);
    });
  }, []);

  const Musicrender = ({item, index}) => {
    return (
      <Animated.View style={styles.main_img}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image source={item.artwork} style={styles.disp_img} />
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: '#18191e', flex: 1}}>
      <View style={styles.maincontainer}>
        <Animated.FlatList
          data={songs}
          keyExtractor={item => item.id}
          renderItem={Musicrender}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEventThrottle={16}
          pagingEnabled
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        {/* <View>
        <FontAwesome name="heart-o" size={30} color="black" />
      </View> */}
        <View style={styles.playname}>
          <Text style={styles.song_name}>{songs[songindex].title}</Text>
          <Text style={styles.song_name2}>{songs[songindex].artist}</Text>
        </View>
        <View style={{marginTop: 15, alignItems: 'center'}}>
          <Slider
            style={styles.progressbar}
            maximumValue={10}
            minimumValue={0}
            minimumTrackTintColor="#05f7f8"
            maximumTrackTintColor="white"
          />
          <View style={styles.duration}>
            <Text style={{color: 'white'}}>05:10</Text>
            <Text style={{color: 'white'}}>00:00</Text>
          </View>
        </View>
        <View style={styles.music_controls}>
          <TouchableOpacity>
            <Feather name="skip-back" size={35} color="#05f7f8" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-play-circle'
                  : 'ios-pause-circle'
              }
              size={65}
              color="#05f7f8"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="skip-forward" size={35} color="#05f7f8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

    // #fe00ee
    // #05f7f8
  );
};

const styles = StyleSheet.create({
  main_img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  music_controls: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  progressbar: {
    width: 350,
    height: 30,
  },
  duration: {
    width: 325,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  interface: {
    backgroundColor: 'gray',
  },
  disp_img: {
    width: 310,
    height: 350,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  maincontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flex: 1,
  },
  playname: {
    alignItems: 'center',
    marginTop: 10,
  },
  song_name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  song_name2: {
    color: 'white',
    fontSize: 16,
  },
});
export default Player;
