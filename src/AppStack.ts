import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';
import { InstanceClass, InstanceSize, InstanceType, MachineImage, Vpc } from '@aws-cdk/aws-ec2';
import { DatabaseInstance } from '@aws-cdk/aws-rds';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

interface AppStackProps extends StackProps {
  /**
   * The VPC that the application should run in.
   */
  readonly vpc: Vpc;

  /**
   * The database instance that the application should communicate with.
   */
  readonly databaseInstance: DatabaseInstance;
}

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    new AutoScalingGroup(this, 'asg', {
      instanceType: InstanceType.of(InstanceClass.T3A, InstanceSize.MEDIUM),
      machineImage: MachineImage.latestAmazonLinux(),
      vpc: props.vpc,
    });
  }

}