import { App } from 'aws-cdk-lib';
import { VideoTranscodingStack } from './stacks/VideoTranscodingStack';

const app = new App();

const stack1 = new VideoTranscodingStack(app, 'MyVideoTranscoder', { multiAz: false });
new VideoTranscodingStack(app, 'ProdStack', { bucket: stack1.bucket });
new VideoTranscodingStack(app, 'QaStack', { multiAz: false });

app.synth();
