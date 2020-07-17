import React, { Component } from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseurl';
import {Loading} from './LoadingComponent';

const mapStateToPros = state => {
    return{
        leaders: state.leaders
    }
}

function RenderItems(props) {
    if(props != null) {
        const renderLeaderItem = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    chevron={false}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        }

        if(props.isLoading) {
            return(
                <ScrollView>
                    <Card title="Corporate Leadership">
                        <Loading/>
                    </Card>
                </ScrollView>
            );
        }else if(props.errMess) {
            return(
                <ScrollView>
                    <Card title="Corporate Leadership">
                        <Text>{props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }else {
            return(
                <Card title="Corporate Leadership">
                    <FlatList
                        data={props.leaders}
                        renderItem={renderLeaderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            );
        }
    }else {
        return(<View></View>);
    }
}

function RenderText() {
    return(
        <Card title="Our History">
            <Text style={{margin: 10}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text style={{margin: 10}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>
    );
}

class About extends Component {

    render() {
        return(
            <ScrollView>
                <RenderText/>
                <RenderItems errMess={this.props.leaders.errMess} isLoading={this.props.leaders.isLoading} leaders={this.props.leaders.leaders}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToPros)(About);