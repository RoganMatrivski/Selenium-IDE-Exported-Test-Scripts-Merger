/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const DnDFile = lazyLoad(
  () => import('./index'),
  module => module.DnDFile,
);
