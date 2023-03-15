
type EventProps = {

}
export const handler = async(event: EventProps, context: any) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("Event: ", event)
    console.log("Context: ", context)
  } catch (error) {
    console.log("SaveTransaction failed")
  }
}