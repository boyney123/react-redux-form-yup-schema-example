import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const formApp = combineReducers({
    form: formReducer
})

export default formApp