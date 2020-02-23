import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { database } from './config';

export const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [buttonUnclickable, setButtonUnclickable] = useState(false);

  //Using once() gets the value from the database once,
  //while using on() continues to listen for changes to the data until you call off
  // (in this case we never call off)
  useEffect(() => {
    database
      .ref()
      .child('messages')
      .once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const initMessages = [];
          Object.keys(data).forEach(message =>
            initMessages.push(data[message]),
          );
          setMessages(initMessages);
        }
      });

    database
      .ref()
      .child('messages')
      .on('child_added', snapshot => {
        if (snapshot) {
          const data = snapshot.val();
          if (data) {
            // console.log(data);
            setMessages(prevState => [...prevState, data]);
          }
        }
      });
  }, []);

  //async functions stop the flow of code. Ensures that code runs sequentially.

  //we debounce button here, usually we can avoid this but in this case,
  //because of the async, we want to make sure the code completes,
  // before it detects another button press
  const addItem = async () => {
    if (!newMessage) return;
    setButtonUnclickable(true);
    await database
      .ref()
      .child('messages')
      .push(newMessage);
    setButtonUnclickable(false);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      {/* Flat list allows us to show a scrolling list of elements */}
      {console.log(messages)}
      <FlatList
        style={{ height: '80%' }}
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItem}>{item}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'flex-end' }}
        behavior='position'
      >
        <View style={styles.messageBox}>
          <TextInput
            placeholder='Enter your message'
            onChangeText={text => setNewMessage(text)}
            style={styles.textInput}
            value={newMessage}
          />
          <Button title='send' onPress={addItem} disabled={buttonUnclickable} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  messageBox: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  listItem: {
    fontSize: 20,
    padding: 20,
  },
});
