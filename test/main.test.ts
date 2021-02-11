import '@aws-cdk/assert/jest';
import { App } from '@aws-cdk/core';
import { VpcStack } from '../src/VpcStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new VpcStack(app, 'test');

  expect(stack).toHaveResource('AWS::EC2::VPC');
});