import { App, Stack } from '@aws-cdk/core';
import { MicroserviceApi } from './Microservice';

// for development, use account/region from cdk cli
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};


const app = new App();
const stack = new Stack(app, 'customer-stack', { env });

new MicroserviceApi(stack, 'customer', {
  directory: 'apis',
});
app.synth();
