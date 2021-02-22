import * as path from 'path';
import { HttpMethod } from '@aws-cdk/aws-apigatewayv2';
// @ts-ignore
import { getRoutes } from '../src/utils';

test('parses default route', async () => {

  const routes = await getRoutes('apis');

  expect(routes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        methods: [HttpMethod.ANY],
        path: '/',
        entry: path.join(__dirname, '..', 'apis', 'index.ts'),
      }),
    ]),
  );
});

test('parses customer delete route', async () => {

  const routes = await getRoutes('apis');

  expect(routes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        methods: [HttpMethod.DELETE],
        path: '/customer',
        entry: path.join(__dirname, '..', 'apis', 'customer', 'delete', 'index.ts'),
      }),
    ]),
  );

});


test('parses customer get route', async () => {

  const routes = await getRoutes('apis');

  expect(routes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        methods: [HttpMethod.GET],
        path: '/customer',
        entry: path.join(__dirname, '..', 'apis', 'customer', 'get', 'index.ts'),
      }),
    ]),
  );

});


test('parses customer post route', async () => {

  const routes = await getRoutes('apis');

  expect(routes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        methods: [HttpMethod.POST],
        path: '/customer',
        entry: path.join(__dirname, '..', 'apis', 'customer', 'post', 'index.ts'),
      }),
    ]),
  );

});


test('parses invoice any route', async () => {

  const routes = await getRoutes('apis');

  expect(routes).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        methods: [HttpMethod.ANY],
        path: '/invoice',
        entry: path.join(__dirname, '..', 'apis', 'invoice', 'any', 'index.ts'),
      }),
    ]),
  );
});