import { Dashboard, GraphWidget } from '@aws-cdk/aws-cloudwatch';
import { IFunction } from '@aws-cdk/aws-lambda';
import { Construct, Stack } from '@aws-cdk/core';

export class LambdaMetrics extends Construct {
  constructor(scope: Construct, id: string, props: { dashboard: Dashboard }) {
    super(scope, id);

    const children = Stack.of(this).node.findAll();
    children
      .filter((x: any) => !!(x.metricErrors))
      .forEach((func) => {
        const lambdaFunction = func as IFunction;
        const errorMetric = lambdaFunction.metricErrors();
        props.dashboard.addWidgets(new GraphWidget({
          width: 12,
          height: 12,
          title: `${lambdaFunction.functionName} errors`,
          left: [errorMetric],
        }));
      });
  }
}