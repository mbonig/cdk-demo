const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.32.1',
  defaultReleaseBranch: 'main',
  name: 'serverless-demo',
  deps: [
    '@matthewbonig/state-machine',
    '@wheatstalk/cdk-intrinsic-validator',
    'aws-sdk',
    'uuid',
  ],
});
project.synth();
