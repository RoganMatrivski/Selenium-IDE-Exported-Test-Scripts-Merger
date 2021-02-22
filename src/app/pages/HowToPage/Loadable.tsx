/**
 * Asynchronously loads the component for ResultPage
 */

import { lazyLoad } from 'utils/loadable';

export const HowToPage = lazyLoad(
  () => import('./index'),
  module => module.HowToPage,
);
