import * as React from 'react';

import { Container } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { Markdown } from '../../components/MarkdownComponent/Loadable';

// import markdownFile from './howtos.md';

export function HowToPage() {
  // const [howToText, setHowToText] = useState('');

  return (
    <>
      <Helmet>
        <title>How To's</title>
      </Helmet>
      <Container maxWidth="lg">
        <Markdown># Testasdasd</Markdown>
      </Container>
    </>
  );
}
