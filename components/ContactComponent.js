import React, { Component } from 'react';
import {Text} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
//import {MailComposer} from 'expo';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['test@test.com'],
            subject: 'Enquiry',
            body: 'This is the message body'
        });
    }

    render() {
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
                    <Button title='Send Email' buttonStyle={{backgroundColor: '#512DA8'}} icon={<Icon name='envelop-o' type='font-awesome' color='white'/>}
                        onPress={this.sendMail}
                    />
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;