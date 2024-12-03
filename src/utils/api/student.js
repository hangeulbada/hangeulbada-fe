import { client } from './base';
import { privateHeaders } from './base';

export const enterClass = async (groupCode) => {
    let returnValue;
    await client
        .post(
            `/api/v1/student/attend`,
            {
                groupCode: groupCode,
            },
            {
                headers: privateHeaders,
            }
        )
        .then((res) => {
            // console.log('res: ', res);
            returnValue = res;
        })
        .catch((err) => {
            console.log(err);
        });
    return returnValue;
};

export const getStuClass = async () => {
    let returnValue;
    await client
        .get(
            `/api/v1/student/group`,

            {
                headers: privateHeaders,
            }
        )
        .then((res) => {
            // console.log('res: ', res);
            returnValue = res;
        })
        .catch((err) => {
            console.log('err', err);
        });
    return returnValue;
};

export const removeStuClass = async (groupId) => {
    let returnValue;
    await client
        .delete(`/api/v1/student/group/${groupId}`, {
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

// 클래스에 있는 문제집 조회
export const getSetByClass = async (groupId) => {
    let returnValue;
    await client
        .get(`/api/v1/workbook/group/${groupId}/workbook`, {
            headers: privateHeaders,
        })
        .then((res) => {
            // console.log('res:', res);
            returnValue = res;
        })
        .catch((err) => {
            console.log('err', err);
        });
    return returnValue;
};

//OCR 요청

export const requestOCR = async (workbookId, imageName) => {
    let returnValue;

    await client
        .post(
            `/api/v1/assignment/submit`,

            {
                workbookId: workbookId,
                imageName: imageName,
            },
            {
                headers: privateHeaders,
            }
        )
        .then((res) => {
            returnValue = res;
            // console.log('OCR RES:', res);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    return returnValue;
};

export const getWBOfStudent = async (groupId) => {
    let returnValue;
    await client
        .get(`/api/v1/student/group/${groupId}/assignment`, {
            headers: privateHeaders,
        })
        .then((res) => {
            returnValue = res;
            // console.log('res: ', res);
        })
        .catch((err) => {
            console.log('err', err);
        });
    return returnValue;
};

export const getStudentAnswer = async (workbookId, studentId) => {
    let returnValue;

    await client
        .get(`/api/v1/assignment/${workbookId}/${studentId}`, {
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

//오답 문제집 생성
export const createIncorrectNote = async (tagName) => {
    try {
        const response = await client.post(
            `/api/v1/incorrect/review`,
            { tagName: tagName },
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

//전체 테스트 결과 불러오기
export const getIncorrectNote = async () => {
    try {
        const response = await client.get(
            `/api/v1/incorrect/group/workbooks`,

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

//학생이 푼 문제집 get
export const getAssignmentAll = async () => {
    try {
        const response = await client.get(
            `/api/v1/student/assignment`,

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
