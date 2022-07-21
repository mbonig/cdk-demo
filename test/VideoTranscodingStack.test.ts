import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { VideoTranscodingStack } from '../src/stacks/VideoTranscodingStack';

test('Snapshot', () => {
  const app = new App();
  const stack = new VideoTranscodingStack(app, 'test');
  const assert = Template.fromStack(stack);
  expect(assert.toJSON()).toMatchSnapshot();
});
