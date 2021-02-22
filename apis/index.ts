export const handler = async (event: any) => {
  let stringedEvent = JSON.stringify(event, null, 2);
  console.log('event: ', stringedEvent);

  return {
    statusCode: 200,
    body: stringedEvent,
  };
};