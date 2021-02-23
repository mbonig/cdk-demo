import * as path from 'path';
import { Dashboard } from '@aws-cdk/aws-cloudwatch';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { App, Stack } from '@aws-cdk/core';
import { LambdaMetrics } from './LambdaMetrics';

// for development, use account/region from cdk cli
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};


const app = new App();
const stack = new Stack(app, 'microservices-stack', { env });

for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
  new NodejsFunction(stack, `lambda-${i}`, { entry: path.join(__dirname, '..', 'test', 'fake-handler.ts') });
}

const dashboard = new Dashboard(stack, 'dashboard', {});

new LambdaMetrics(stack, 'lambda-metrics', { dashboard });


app.synth();
