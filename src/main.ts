import { App } from '@aws-cdk/core';
import { AppStack } from './AppStack';
import { DatabaseStack } from './DatabaseStack';
import { VpcStack } from './VpcStack';

// for development, use account/region from cdk cli
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const vpcStack = new VpcStack(app, 'vpc', { env });

const databaseStack = new DatabaseStack(app, 'backend', {
  env,
  vpc: vpcStack.vpc,
});

new AppStack(app, 'frontend', {
  env,
  vpc: vpcStack.vpc,
  databaseInstance: databaseStack.databaseInstance,
});

app.synth();