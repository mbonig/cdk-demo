import { App } from '@aws-cdk/core';
import { DatabaseStack } from './DatabaseStack';
import { VpcStack } from './VpcStack';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const vpcStack = new VpcStack(app, 'vpc', { env: devEnv });

new DatabaseStack(app, 'backend', {
  env: devEnv,
  vpc: vpcStack.vpc,
});
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();