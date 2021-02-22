import * as React from 'react';

import { createStyles, makeStyles } from '@material-ui/core';

import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles(theme =>
  createStyles({
    previewChip: {},
  }),
);

const acceptedFiles = ['text/plain', '.cs'];

interface IProps {
  onChange?: (files: File[]) => void | undefined;
}

export function DnDFile(props: IProps) {
  const classes = useStyles();
  return (
    <DropzoneArea
      acceptedFiles={acceptedFiles}
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewGridProps={{
        container: {
          spacing: 1,
          direction: 'row',
        },
      }}
      onChange={props.onChange}
      previewChipProps={{ classes: { root: classes.previewChip } }}
      previewText="Selected files"
    />
  );
}
