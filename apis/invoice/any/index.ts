export const handler = async (event: any) => {
  console.log('event: ', JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify(event, null, 2),
  };
};