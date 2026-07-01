// import WebView from "react-native-webview"; export default function
// ChapterView(chapterUri =
// "https://asurascans.com/comics/infinite-mage-75e30c62/chapter/161") { return
// (     <WebView>       source=       {{         uri:
// "https://asurascans.com/comics/infinite-mage-75e30c62/chapter/161"       }}
// </WebView>   ); }

import {WebView} from 'react-native-webview';
import Constants from 'expo-constants';
import {Pressable, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {Dimensions} from 'react-native';

export default function ChapterView() {

    const route = useRoute();

    const {chapter_uri} = route.params;

    return (
        <View style={styles.container}>
            <WebView source={{
                    uri: chapter_uri
                }}/>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    }
});

{/* <View className='flex flex-row gap-2'>
                <Pressable>
                  <Text>Prev</Text>
                </Pressable>

                <Pressable>
                  <Text>Next</Text>
                </Pressable>
              </View>    */
}