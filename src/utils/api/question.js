import { client } from "./base";
import { privateHeaders } from "./base";

export const createQuestions = async (workbookId, content) => {
  let returnValue;

  await client
    .post(`/api/v1/workbook/${workbookId}/questions/new`,
      {
        content: content,
      },
      {
        headers: privateHeaders
      }
    )
    .then((res) => {
      returnValue = res;
    })
    .catch((err) => {
      console.log(err);
    })
  return returnValue;
}

export const getAllQuestions = async () => {
  let returnValue;

  await client
    .post(`/api/v1/questions`,
      {

      },
      {
        headers: privateHeaders
      }
    )
    .then((res) => {
      returnValue = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    return returnValue;
}