import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Construct } from '@aws-cdk/core';
// @ts-ignore
import { getRoutes } from './utils';

export interface Route {
  handler?: string;
  entry: string;
  path: string;
  methods: HttpMethod[];
}

export interface MicroserviceApiProps {
  directory: string;
}

export class MicroserviceApi extends Construct {
  constructor(scope: Construct, id: string, props: MicroserviceApiProps) {
    super(scope, id);

    const routes = getRoutes(props.directory);

    const defaultRoute = routes.find((x: { path: string }) => x.path === '/')!;
    const defaultHandler = new NodejsFunction(this, 'default', {
      entry: defaultRoute.entry,
      handler: defaultRoute.handler || 'handler',
    });

    const api = new HttpApi(this, 'api', {
      apiName: `${id}-api`,
      defaultIntegration: new LambdaProxyIntegration({
        handler: defaultHandler,
      }),
    });

    let nonDefaultRoutes = routes.filter((x: { path: string }) => x.path !== '/');
    for (const route of nonDefaultRoutes) {
      api.addRoutes({
        methods: route.methods,
        path: route.path,
        integration: new LambdaProxyIntegration({
          handler: new NodejsFunction(this, `${id}-${route.path}-${route.methods[0]}`, {
            entry: route.entry,
            handler: route.handler || 'handler',
          }),
        }),
      });
    }
  }
}