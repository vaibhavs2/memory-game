/**
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  character: string,
  visiblity: boolean,
  success: boolean,
  onPress: () => void,
};

export default function TouchableCard({
  character,
  visiblity,
  success,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: success ? 'green' : 'red'}]}
      onPress={onPress}>
      <Text style={styles.headerText}>{visiblity ? character : ''}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    justifyContent: 'center',
    height: 115,
    width: 75,
    borderRadius: 5,
    margin: 5,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'pink',
    textAlign: 'center',
  },
});
