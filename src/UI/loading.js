import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Spinner } from 'native-base';
import api from '../api';
export default class Loading extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: 'transparent' }} >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { api.pop() }}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }} >
                    <Spinner color='red' />
                </TouchableOpacity>

            </Container>
        );
    }
}