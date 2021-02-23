import '@aws-cdk/assert/jest';
import * as path from 'path';
import { Dashboard } from '@aws-cdk/aws-cloudwatch';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { App, Stack } from '@aws-cdk/core';
import { LambdaMetrics } from '../src/LambdaMetrics';
import { VpcStack } from '../src/VpcStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new VpcStack(app, 'test');

  expect(stack).toHaveResource('AWS::EC2::VPC');
});

test('whatever', async () => {


  const app = new App();
  const stack = new Stack(app, 'customer-stack', {});

  for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    new NodejsFunction(stack, `lambda-${i}`, { entry: path.join(__dirname, 'fake-handler.ts') });
  }

  const dashboard = new Dashboard(stack, 'dashboard', {});

  new LambdaMetrics(stack, 'lambda-metrics', { dashboard });


});