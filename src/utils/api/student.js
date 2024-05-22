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
      console.log('res: ', res);
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
      console.log('res: ', res);
      returnValue = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return returnValue;
};

export const removeStuClass = async (groupId) => {
  let returnValue;
  await client
  .delete(
    `/api/v1/student/group/${groupId}`, {
      headers: privateHeaders,
    }
  )
  .then((res)=>{
    returnValue = res;
  }).catch((err)=>{
    console.log(err);
  })
  return returnValue
}