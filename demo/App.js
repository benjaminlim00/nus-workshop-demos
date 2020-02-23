import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default function HomeScreen() {
  const [one, setOne] = useState('0');
  const [two, setTwo] = useState('0');
  const [five, setFive] = useState('0');
  const [ten, setTen] = useState('0');
  const [total, setTotal] = useState(null);

  const calculateTotal = (one, two, five, ten) => {
    setTotal(
      parseInt(one) +
        parseInt(two) * 2 +
        parseInt(five) * 5 +
        parseInt(ten) * 10,
    );
  };

  const onChangeOne = val => {
    setOne(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
    calculateTotal(val, two, five, ten);
  };
  const onChangeTwo = val => {
    setTwo(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
    calculateTotal(one, val, five, ten);
  };
  const onChangeFive = val => {
    setFive(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
    calculateTotal(one, two, val, ten);
  };
  const onChangeTen = val => {
    setTen(val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
    calculateTotal(one, two, five, val);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}
    >
      <Grid style={{ marginVertical: 150 }}>
        <Col>
          <Row>
            <View
              style={{
                margin: 10,
                padding: 10,
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                flex: 1,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$1</Text>
              <TextInput
                onChangeText={onChangeOne}
                value={one}
                keyboardType={'numeric'}
              ></TextInput>
            </View>
          </Row>
          <Row>
            <View
              style={{
                margin: 10,
                padding: 10,
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                flex: 1,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$5</Text>
              <TextInput
                onChangeText={onChangeFive}
                value={five}
                keyboardType={'numeric'}
              ></TextInput>
            </View>
          </Row>
        </Col>
        <Col>
          <Row>
            <View
              style={{
                margin: 10,
                padding: 10,
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                flex: 1,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$2</Text>
              <TextInput
                onChangeText={onChangeTwo}
                value={two}
                keyboardType={'numeric'}
              ></TextInput>
            </View>
          </Row>
          <Row>
            <View
              style={{
                margin: 10,
                padding: 10,
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                flex: 1,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>$10</Text>
              <TextInput
                onChangeText={onChangeTen}
                value={ten}
                keyboardType={'numeric'}
              ></TextInput>
            </View>
          </Row>
        </Col>
      </Grid>

      <View style={{ marginBottom: 100 }}>
        <Card>
          <Text>Total $: {total}</Text>
        </Card>
      </View>
    </View>
  );
}
