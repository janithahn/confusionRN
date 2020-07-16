import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {Tile} from 'react-native-elements';
import { baseUrl } from '../shared/baseurl';
import { connect } from 'react-redux';
import {Loading} from './LoadingComponent';

const mapStateToPros = state => {
    return{
        dishes: state.dishes
    }
}

class Menu extends Component {

    static navigationOptions = {
        title: 'Menu'
    };

    render(){
        const renderMenuItem = ({item, index}) => {
            return(
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('Dishdetail', {dishId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        }

        const {navigate} = this.props.navigation

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}

export default connect(mapStateToPros)(Menu);