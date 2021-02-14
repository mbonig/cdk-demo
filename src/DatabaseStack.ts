import { Vpc } from '@aws-cdk/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, MysqlEngineVersion } from '@aws-cdk/aws-rds';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { DatabaseUser } from '@matthewbonig/rds-tools';

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

    new DatabaseUser(this, 'service-account', {
      databaseInstance: this.databaseInstance,
      username: 'app',
      databases: ['somedatabase'],
    });

    for (const username of ['julie', 'sriram', 'steve']) {
      new DatabaseUser(this, `${username}-account`, {
        databaseInstance: this.databaseInstance,
        username: username,
        databases: ['somedatabase'],
      });
    }
  }
}