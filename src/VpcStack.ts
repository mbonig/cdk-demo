import { Vpc } from '@aws-cdk/aws-ec2';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

interface VpcStackProps extends StackProps {
}

export class VpcStack extends Stack {
  public vpc: Vpc;

  constructor(scope: Construct, id: string, props: VpcStackProps = {}) {
    super(scope, id, props);

    this.vpc = new Vpc(this, 'vpc', {
      maxAzs: 2,
    });
  }
}