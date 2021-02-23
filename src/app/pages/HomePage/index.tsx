import * as React from 'react';

import {
  Button,
  Container,
  Dialog,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { LazyLog, ScrollFollow } from 'react-lazylog';
import { SetResult, store } from '../../../store/resultStore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { DnDFile } from '../../components/DnDFile/Loadable';
import { Helmet } from 'react-helmet-async';
import { InsertTestFunction } from './scriptFile';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }),
);

interface IDialogProps {
  text?: string;
  showDialog?: boolean;
}

function DialogWindow(props: IDialogProps) {
  return (
    <Dialog open={props.showDialog || false} keepMounted>
      <Container maxWidth="lg" style={{ padding: '1em 32px' }}>
        <Typography variant="h5">
          Please wait while we merge the scripts.
        </Typography>
        <LinearProgress />
        <div style={{ height: '200px', width: '60vw' }}>
          <ScrollFollow
            startFollowing
            render={({ onScroll, follow, startFollowing, stopFollowing }) => (
              <LazyLog
                text={props.text || 'initializing'}
                onScroll={onScroll}
                follow={follow}
              />
            )}
          />
        </div>
      </Container>
    </Dialog>
  );
}

export function HomePage() {
  const classes = useStyles();
  const history = useHistory();
  const [files, setFiles] = useState<Array<File>>();
  const [suiteName, setSuiteName] = useState('NewSuiteTest');

  const [logs, setLogs] = useState(['Initalizing...'] as Array<string>);
  const [showDialog, setShowDialog] = useState(false);

  function addLog(log: string) {
    const updatedLogs = [...logs];
    updatedLogs.push(log);
    setLogs(updatedLogs);
  }

  function MergeFiles() {
    console.log(files);
    if (files == null) return; // TODO: Handle on files undefined

    addLog(`Reading all ${files.length} files`);
    const GetTextPromise = [] as Array<Promise<string>>;
    for (const file of files!) {
      GetTextPromise.push(file.text());
    }

    Promise.all(GetTextPromise)
      .then(result => {
        addLog(`Done reading files`);
        const fileStrings = result;

        const functionStrings = [] as Array<string>;

        addLog(`Extracting test functions`);
        for (const fileString of fileStrings) {
          const splittedFileString = fileString.replace(/\r/g, '').split('\n');

          const functionLines = splittedFileString.slice(26, -2);
          functionStrings.push(functionLines.join('\n'));
        }

        addLog(`Building merged scripts`);
        const finalString = InsertTestFunction(suiteName, ...functionStrings);
        store.dispatch(SetResult(finalString));

        addLog(`Done!`);
        history.push('/result');
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleOnClick() {
    setShowDialog(true);
    MergeFiles();
  }

  return (
    <>
      <DialogWindow showDialog={showDialog} text={logs.join('\n')} />
      <Helmet>
        <title>Homepage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="md">
        <TextField
          label="Test Suite Name"
          id="standard-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          value={suiteName}
          onChange={event => setSuiteName(event.target.value)}
        />
        <DnDFile onChange={files => setFiles(files)} />
        <Button color="primary" variant="contained" onClick={handleOnClick}>
          MERGE
        </Button>
      </Container>
    </>
  );
}
