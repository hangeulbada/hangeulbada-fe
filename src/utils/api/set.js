import { client } from './base';
import { privateHeaders } from './base';

export const getSetList = async () => {
    let returnValue;

    await client
        .get(`/api/v1/workbook`, {
            params: {},
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

export const getSet = async (workbookId) => {
    let returnValue;

    await client
        .get(`/api/v1/workbook/${workbookId}`, {
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

export const removeSet = async (workbookId) => {
    let returnValue;

    await client
        .delete(`/api/v1/workbook/${workbookId}`, {
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

export const createSet = async (title, description, questionNum, startDate, endDate) => {
    let returnValue;

    await client
        .post(
            `/api/v1/workbook`,
            {
                title: title,
                description: description,
                questionNum: questionNum,
                startDate: startDate,
                endDate: endDate,
            },
            {
                headers: privateHeaders,
            }
        )
        .then((res) => {
            returnValue = res;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const getSetListByWBId = async (workbookId) => {
    let returnValue;
    await client
        .get(`/api/v1/workbook/${workbookId}/questions`, {
            headers: privateHeaders,
        })
        .then((res) => {
            returnValue = res;
            // console.log('getsetListByWBId: ', res);
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const addSetToClass = async (groupId, workbookIds) => {
    let returnValue;

    await client
        .post(
            `/api/v1/workbook/group/${groupId}/workbooks`,
            {
                workbookIds: workbookIds,
            },
            {
                headers: privateHeaders,
            }
        )
        .then((res) => {
            returnValue = res;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const ShareSet = async (shareCode, startDate, endDate) => {
    try {
        const res = await client.post(
            `/api/v1/workbook/workbook/add`,
            {
                workbookId: shareCode,
                startDate: startDate,
                endDate: endDate,
            },
            {
                headers: privateHeaders,
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const ShareSetQuestions = async (shareCode, groupId) => {
    try {
        const res = await client.post(
            `/api/v1/workbook/group/${groupId}/workbooks`,
            { workbookIds: shareCode },
            {
                headers: privateHeaders,
            }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
