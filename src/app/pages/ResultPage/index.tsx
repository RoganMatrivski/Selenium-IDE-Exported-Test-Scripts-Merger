import * as React from 'react';

import { Button, Container, Typography } from '@material-ui/core';
import { SetResult, store } from '../../../store/resultStore';

import GetAppIcon from '@material-ui/icons/GetApp';
import { Helmet } from 'react-helmet-async';
import fileDownload from 'js-file-download';

export function ResultPage() {
  function downloadFile() {
    const finalString = store.getState();
    const file = new Blob([finalString as BlobPart]);

    fileDownload(finalString as BlobPart, 'MergedScript.cs');
  }

  function handleDownloadClick() {
    downloadFile();
  }

  return (
    <>
      <Helmet>
        <title>Result</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography variant="h4">Successfully Merged the Scripts</Typography>
        <Typography>
          Click the button below to download the script file.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GetAppIcon />}
          onClick={handleDownloadClick}
        >
          Download
        </Button>
        <Typography>
          What's next? You can merge the script into an existing XUnit test
          project. Click here for more information.
        </Typography>
      </Container>
    </>
  );
}
