import { App } from '@aws-cdk/core';
import { AppStack } from './AppStack';
import { DatabaseStack } from './DatabaseStack';
import { VpcStack } from './VpcStack';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

// for development, use account/region from cdk cli
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

async function getUsernames() {
  const { Items: users } = await ddb.scan({ TableName: 'sql-users' }).promise();
  return users.map((x: { username: string }) => x.username);
}

(async () => {

  const usernames = await getUsernames();
  const app = new App();

  const vpcStack = new VpcStack(app, 'vpc', { env });

  const databaseStack = new DatabaseStack(app, 'backend', {
    env,
    vpc: vpcStack.vpc,
    usernames,
  });

  new AppStack(app, 'frontend', {
    env,
    vpc: vpcStack.vpc,
    databaseInstance: databaseStack.databaseInstance,
  });

  app.synth();

})();
