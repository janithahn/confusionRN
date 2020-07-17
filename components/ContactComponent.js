import React from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function Contact() {
    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact Information">
                <Text style={{margin: 10}}>
                    <p>121, Clear Water Bay Road\n\nClear Water Bay, Kowloon</p>
                    <p>HONG KONG</p>
                    <p>Tel: +852 1234 5678</p>
                    <p>Fax: +852 8765 4321</p>
                    <p>Email:confusion@food.net"</p>
                </Text>
            </Card>
        </Animatable.View>
    );
}

export default Contact;