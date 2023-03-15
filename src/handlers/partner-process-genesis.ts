import * as AWS from "aws-sdk";

const SQS = new AWS.SQS();

const queueUrl = process.env.SAVE_DATA_QUEUE_URL;

export const handler = async (event: any, context: any) => {
  console.log("Process event: ", event);
  console.log("Context: ", context);
  const messages = event.Records.map((record: any) => {
    const payload = Buffer.from(record.kinesis.data, "base64").toString(
      "ascii"
    );
    return payload;
  });
  console.log("Decoded messages", messages);
  const params: any = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messages),
    MessageGroupId: "partner-task-process",
    MessageDeduplicationId: Date.now().toString()
  };
  
  console.log("params: ", params)
  await SQS.sendMessage(params, (error, data) => {
    if (error) console.log("Error: ", error);
    console.log("data: ", data);
  }).promise();

  return {
    message: "The event was received successful",
  };
};
