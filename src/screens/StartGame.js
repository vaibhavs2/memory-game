/**
 * @flow strict-local
 */

import React from 'react';
import {View, Text, Button, StyleSheet, BackHandler} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

export default function StartGame({route, navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Memory</Text>
      <Text style={styles.headerSubText}>Game</Text>
      <View style={styles.buttonView}>
        <Button
          onPress={() => navigation.navigate('Play')}
          title="Play"
          color="blue"
        />
        <View style={styles.buttonGap} />
        <Button onPress={BackHandler.exitApp} title="Exit" color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
  },
  headerSubText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonGap: {
    height: 12,
  },
});
