import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { StartTranscodingLambda } from '../constructs/StartTranscodingLambda/TriggerTranscodingFunction';
import { VideoTranscodingStackTest } from '../constructs/VideoTranscodingStackTest/VideoTranscodingStackTest';

export class VideoTranscodingStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const mediaBucket = new Bucket(this, 'Media', {});
    new StartTranscodingLambda(this, 'Lambda', {
      bucket: mediaBucket,
    });
    new VideoTranscodingStackTest(this, 'Test', {
      bucket: mediaBucket,
    });
  }
}
