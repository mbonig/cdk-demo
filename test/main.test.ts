import '@aws-cdk/assert/jest';
import * as path from 'path';
import { HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { App } from '@aws-cdk/core';
// @ts-ignore
import { getFiles } from '../src/utils';
import { VpcStack } from '../src/VpcStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new VpcStack(app, 'test');

  expect(stack).toHaveResource('AWS::EC2::VPC');
});

test('whatever', async () => {


  for (const file of await getFiles('apis')) {

    const pathParts = file.split(path.sep);
    const filename = pathParts[pathParts.length - 1];
    const routePath = file.replace(path.join(__dirname, '..', 'apis'), '').replace(filename, '').replace(path.sep, '/');
    const routePathParts = routePath.split(path.sep).filter((x: string) => !!x);
    const method = routePath === '/' ? HttpMethod.ANY : routePathParts[1] as HttpMethod;

    const route = {
      methods: [method],
      path: `/${routePathParts[0] || ''}`,
      entry: file,
    };

    console.log({ route });
  }

});