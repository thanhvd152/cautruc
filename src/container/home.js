import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import api from '../api';
export default class Home extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }} >
                <Content style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} >
                    <Button onPress={() => { api.pop() }} >
                        <Text>Click Me!</Text>
                    </Button>
                </Content>

            </Container>
        );
    }
}