/**
 * Asynchronously loads the component for ResultPage
 */

import { lazyLoad } from 'utils/loadable';

export const ResultPage = lazyLoad(
  () => import('./index'),
  module => module.ResultPage,
);
