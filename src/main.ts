import { Artifact } from '@aws-cdk/aws-codepipeline';
import { GitHubSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { App, Construct, SecretValue, Stack, StackProps, Stage, StageProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
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

interface PipelineStackProps extends StackProps {
  usernames: string[];
}

interface SuperAppProps extends StageProps {
  usernames: string[];
}

class SuperApp extends Stage {
  constructor(scope: Construct, id: string, props: SuperAppProps) {
    super(scope, id, props);
    const vpcStack = new VpcStack(this, 'vpc', props);

    const databaseStack = new DatabaseStack(this, 'backend', {
      ...props,
      vpc: vpcStack.vpc,
      usernames: props.usernames,
    });

    new AppStack(this, 'frontend', {
      ...props,
      vpc: vpcStack.vpc,
      databaseInstance: databaseStack.databaseInstance,
    });
  }
}

class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'MyAppPipeline',
      cloudAssemblyArtifact,

      sourceAction: new GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('GITHUB_TOKEN_NAME'),
        owner: 'mbonig',
        repo: 'cdk-demo',
        branch: 'main',
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
      }),
    });

    pipeline.addApplicationStage(new SuperApp(this, 'dev', { ...props }));
  }
}

(async () => {

  const usernames = await getUsernames();
  const app = new App();
  new PipelineStack(app, 'pipeline', {
    env,
    usernames,
  });
  app.synth();

})();
