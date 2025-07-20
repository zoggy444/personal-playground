import { test, expect } from '@playwright/experimental-ct-react';
import App from '../../App';

test('should work', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('2048');
});