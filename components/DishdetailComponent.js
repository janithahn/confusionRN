import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, Modal, Button, StyleSheet} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import { baseUrl } from '../shared/baseurl';
import { connect } from 'react-redux';
import {postFavorite, postComment} from '../redux/ActionCreators';

const mapStateToPros = state => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return(
            <View>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}
                >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.iconButtons}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#F50'
                            onPress={() => props.favorite ? alert("Already Favorite") : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'pencil'}
                            type={'font-awesome'}
                            color='#512DA8'
                            onPress={() => props.handleCommentModal()}
                        />
                    </View>
                </Card>
            </View>
        );
    }else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    handleComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
        this.toggleModal();
    }

    handleCommentModal() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
    
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');

        return(
            <ScrollView>
                <RenderDish handleCommentModal={() => this.handleCommentModal()} onPress={() => this.markFavorite(dishId)} favorite={this.props.favorites.some(el => el === dishId)} dish={this.props.dishes.dishes[+dishId]}/>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style = {styles.modal}>
                        <Rating showRating fractions={0} startingValue={0} onFinishRating={rt => this.setState({rating: rt})}/>
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={text => this.setState({author: text})}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={text => this.setState({comment: text})}
                        />

                        <View style={styles.modalButtons}>
                            <Button 
                                onPress = {() => this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment)}
                                color="#512DA8"
                                title="Submit" 
                            />
                        </View>
                        <View>
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#707070"
                                title="Close" 
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     },
     modalButtons: {
         marginBottom: 10,
         marginTop: 10
     },
     iconButtons: {
         alignItems: 'center',
         justifyContent: 'center',
         flexDirection: 'row'
     }
});

export default connect(mapStateToPros, mapDispatchToProps)(Dishdetail);