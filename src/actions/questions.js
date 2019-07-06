import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

function addQuestion(question) {
    return{
        type: ADD_QUESTION,
        question,
   }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            authedUser: authedUser
        }).then(question => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    };
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

function answerQuestion(authedUser, qid, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer,
    }
}

export function handleAnswerQuestion (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        return saveQuestionAnswer (authedUser, qid, answer)
        .then(() => dispatch(answerQuestion(authedUser, qid, answer)))
        .then(() => dispatch(hideLoading()))
    };
}