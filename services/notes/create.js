import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  console.log("Start");
  const data = JSON.parse(event.body);

  console.log(data);
  const params = {
    TableName: "dev-notes-infra-dynamodb-TableCD117FA1-CIKGVVJAGUFQ",//process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  console.log("End");
  return params.Item;
});