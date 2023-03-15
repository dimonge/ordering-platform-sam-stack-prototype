import * as AWS from "aws-sdk";

const Kinesis = new AWS.Kinesis();

type CommandEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    event: {
      type: string;
      data: Record<string, unknown>;
    }
  };
};
const eventName = process.env.STREAM_NAME;

export const handler = async (event: CommandEvent, context: any): 
  Promise<Record<string, unknown> | null | undefined> => {
  try {
    const payload = event.arguments.event.data;
    console.log("Event: ", event)
    console.log("Context: ", context)

  const request = {
    Data: JSON.stringify({
      event: event.arguments.event.type,
      data: payload,
    }),
    PartitionKey: "2",
    StreamName: eventName as string,
  };
  console.log("request: ", request);
  await Kinesis.putRecord(request, (error, data) => {
    if (error) {
      console.error("Error occurred: ", error);
    }
    console.log("EVENT DATA: ", data);
  }).promise();
  
  return {
    type: event.arguments.event.type,
    data: event.arguments.event.data
  };
    
  } catch(error) {
    return {
      error
    }
  }
};