/**
 * @flow strict-local
 */

import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {TouchableCard} from '../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList, 'Play'>;

export default function PlayGame({route, navigation}: Props) {
  const [getGameInfo, setGameInfo] = useState({
    matches: 0,
    attempts: 0,
    justRender: false,
  });

  const restartGame = () =>
    [...ALPHABETS, ...ALPHABETS]
      .map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => ({character: value, visiblity: false, success: false}));

  const cardsAlphabets = useRef<
    Array<{character: string, visiblity: boolean, success: boolean}>,
  >(restartGame());

  const hapticFeedBack = () =>
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            cardsAlphabets.current = restartGame();
            setGameInfo({
              matches: 0,
              attempts: 0,
              justRender: false,
            });
            hapticFeedBack();
          }}
          title="Restart"
        />
      ),
    });
  }, []);
  const numberOfCardOpen = useRef([]);

  const {width: WIDTH} = useWindowDimensions();

  const changeVisibility = (index: number): void => {
    let alphabets = cardsAlphabets.current;

    if (alphabets[index].success) return;

    if (numberOfCardOpen.current.length === 2) {
      hapticFeedBack();
      return;
    }

    if (numberOfCardOpen.current.length == 1) {
      if (numberOfCardOpen.current[0] == index) {
        return;
      }

      let prev = alphabets[numberOfCardOpen.current[0]];
      let now = alphabets[index];
      now.visiblity = true;
      setGameInfo({...getGameInfo, justRender: !getGameInfo.justRender});

      setTimeout(() => {
        let matches = getGameInfo.matches;
        if (prev.character === now.character) {
          prev.success = true;
          now.success = true;
          matches++;
          hapticFeedBack();
        }
        prev.visiblity = false;
        now.visiblity = false;
        numberOfCardOpen.current.length = 0;
        setGameInfo({
          ...getGameInfo,
          attempts: ++getGameInfo.attempts,
          matches,
        });
      }, 1500);
    } else {
      alphabets[index].visiblity = true;
      setGameInfo({...getGameInfo, justRender: !getGameInfo.justRender});
    }
    numberOfCardOpen.current.push(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameStat}>
        <Text>Matches {getGameInfo.matches}</Text>
        <Text>Attempts {getGameInfo.attempts} </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={4}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        columnWrapperStyle={{justifyContent: 'center'}}
        key={`rotate${Math.random()}`}
        keyExtractor={(item, index) => `${index}`}
        data={cardsAlphabets.current}
        renderItem={({item, index}) => (
          <TouchableCard
            character={item.character}
            visiblity={item.visiblity}
            success={item.success}
            onPress={() => {
              changeVisibility(index);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'pink',
  },
  gameStat: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
});
