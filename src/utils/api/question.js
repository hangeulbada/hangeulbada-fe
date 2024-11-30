import { client } from './base';
import { privateHeaders } from './base';

export const createQuestions = async (workbookId, questions) => {
    let returnValue;

    await client
        .post(`/api/v1/workbook/${workbookId}/questions/new`, questions, {
            headers: privateHeaders,
            'Contetn-Type': 'application/json',
        })
        .then((res) => {
            returnValue = res;
            console.log('res', returnValue);
        })
        .catch((err) => {
            console.log('q', questions);
            console.log(err);
        });
    return returnValue;
};

//ai 문제 생성
export const generateAIQuestions = async (difficulty, rule, count) => {
    let returnValue;

    await client
        .post(
            `/api/v1/ai-generate`,
            { difficulty, rule, count },
            {
                headers: privateHeaders,
                'Contetn-Type': 'application/json',
            }
        )
        .then((res) => {
            returnValue = res;
            console.log('res', returnValue);
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

//ai 문제집 생성

export const createAIQuestionSet = async (workbookId, questions, difficulty) => {
    let returnValue;

    await client
        .post(
            `/api/v1/workbook/${workbookId}/questions/new-ai`,
            { difficulty, questions },
            {
                headers: privateHeaders,
                'Contetn-Type': 'application/json',
            }
        )
        .then((res) => {
            returnValue = res;
            console.log('res', returnValue);
        })
        .catch((err) => {
            console.log('q', questions);
            console.log(err);
        });
    return returnValue;
};

export const getAllQuestions = async () => {
    let returnValue;

    await client
        .post(
            `/api/v1/questions`,
            {},
            {
                headers: privateHeaders,
            }
        )
        .then((res) => {
            returnValue = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const getSetQuestions = async (workbookId) => {
    let returnValue;

    await client
        .get(`/api/v1/workbook/${workbookId}/questions`, {
            headers: privateHeaders,
        })
        .then((res) => {
            returnValue = res;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const addQuestion = async (workbookId, question) => {
    let returnValue;

    await client
        .post(`/api/v1/workbook/${workbookId}/questions`, question, {
            headers: privateHeaders,
        })
        .then((res) => {
            returnValue = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const removeQuestion = async (questionId) => {
    let returnValue;

    await client
        .delete(`/api/v1/questions/${questionId}`, {
            headers: privateHeaders,
        })
        .then((res) => {
            returnValue = res;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const getQuestionsInSet = async (workbookId, questionId) => {
    let returnValue;

    await client
        .get(`/api/v1/workbook/${workbookId}/questions/${questionId}`, {
            headers: privateHeaders,
        })
        .then((res) => {
            returnValue = res;
        })
        .catch((err) => {
            console.log('err: ', err);
        });

    return returnValue;
};

//ai로 문제집 구성
