import * as ActionTypes from './ActionTypes';

export const comments = (state = {
    errMess: null,
    comments: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload}
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments: []}
        
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            console.log('THE LENGTH IS: ', comment.id);
            return {...state, comments: state.comments.concat(comment)};

            
        default:
            return state;
        
    }
}