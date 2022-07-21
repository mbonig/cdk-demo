import { App } from 'aws-cdk-lib';
import { VideoTranscodingStack } from './stacks/VideoTranscodingStack';

const app = new App();

new VideoTranscodingStack(app, 'MyVideoTranscoder');

app.synth();
