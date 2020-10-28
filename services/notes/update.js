import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    // 'UpdateExpression' 업데이트 될 속성을 정의합니다.
    // 'ExpressionAttributeValues' 업데이트 표현식의 값을 정의합니다.
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
    },
    // 'ReturnValues' 아이템 속성을 반환할지 여부와 방법을 지정합니다.
    // 여기서 ALL_NEW는 업데이트 후 항목의 모든 속성을 반환합니다.
    // 아래에서 '결과값'을 검사하여 다른 설정에서 작동하는 방식을 확인할 수 있습니다.
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);
  return { status: true };
});