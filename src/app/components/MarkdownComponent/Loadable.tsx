/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const Markdown = lazyLoad(
  () => import('./index'),
  module => module.Markdown,
);
