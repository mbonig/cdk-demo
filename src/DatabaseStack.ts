import { Vpc } from '@aws-cdk/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine, MysqlEngineVersion } from '@aws-cdk/aws-rds';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { DatabaseUser } from '@matthewbonig/rds-tools';

interface DatabaseStackProps extends StackProps {
  /**
   * Usernames to create against the sql database.
   */
  usernames: string[];
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

    for (const username of props.usernames) {
      new DatabaseUser(this, `${username}-account`, {
        databaseInstance: this.databaseInstance,
        username: username,
        databases: ['somedatabase'],
      });
    }
  }
}