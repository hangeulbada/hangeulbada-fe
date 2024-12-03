import { client } from './base';
import { privateHeaders } from './base';

export const getStatistics = async () => {
    try {
        const response = await client.get(`/api/v1/incorrect/statistics`, {
            headers: privateHeaders,
        });
        return response;
    } catch (err) {
        console.error('err', err);
        throw err;
    }
};

export const getIncorrectGroup = async () => {
    try {
        const response = await client.get(`/api/v1/incorrect/group`, {
            headers: privateHeaders,
        });
        return response;
    } catch (err) {
        console.error('err', err);
        throw err;
    }
};

export const getIncorrectNote = async () => {
    try {
        const response = await client.get(`/api/v1/incorrect/workbooks`, {
            headers: privateHeaders,
        });
        return response;
    } catch (err) {
        console.error('err', err);
        throw err;
    }
};

//학생이 푼 문제집 get
export const getMyResult = async (assignmentId) => {
    try {
        const response = await client.get(
            `/api/v1/student/assignment/${assignmentId}`,

            {
                headers: privateHeaders,
            }
        );
        return response;
    } catch (err) {
        console.error('err', err);
        throw err;
    }
};
