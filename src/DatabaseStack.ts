import { Vpc } from '@aws-cdk/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, MysqlEngineVersion } from '@aws-cdk/aws-rds';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

interface DatabaseStackProps extends StackProps {
  /**
   * The VPC that the application should run in.
   */
  vpc: Vpc;
}

export class DatabaseStack extends Stack {
  public databaseInstance: DatabaseInstance;
  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    this.databaseInstance = new DatabaseInstance(this, 'db', {
      engine: DatabaseInstanceEngine.mysql({ version: MysqlEngineVersion.VER_8_0_21 }),
      vpc: props.vpc,
    });
  }
}