import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {baseUrl} from '../shared/baseurl';
import { connect } from 'react-redux';
import {Loading} from './LoadingComponent';

const mapStateToPros = state => {
    return{
        leaders: state.leaders,
        dishes: state.dishes,
        promotions: state.promotions
    }
}

function RenderItem(props) {
    const item = props.item;

    if(props.isLoading) {
        return(<Loading/>);
    }else if(props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }else {
        if(item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: baseUrl + item.image}}
                >
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
            );
        }else {
            return(<View></View>);
        }  
    }
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return(
            <ScrollView>
                <RenderItem errMess={this.props.dishes.errMess} isLoading={this.props.dishes.isLoading} item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}></RenderItem>
                <RenderItem errMess={this.props.promotions.errMess} isLoading={this.props.promotions.isLoading} item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}></RenderItem>
                <RenderItem errMess={this.props.leaders.errMess} isLoading={this.props.leaders.isLoading} item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}></RenderItem>
            </ScrollView>
        );
    }
}

export default connect(mapStateToPros)(Home);