/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';

import { Editor } from './Editor';

const useStyles = makeStyles(() => ({
  editorPanel: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr ',
  },
}));

interface EditorPanelProps {
  editorRenderers: JsonFormsRendererRegistryEntry[];
}
export function EditorPanel({ editorRenderers }: EditorPanelProps) {
  const classes = useStyles();
  return (
    <div className={classes.editorPanel}>
      <h1>Editor</h1>
      <Editor editorRenderers={editorRenderers} />
    </div>
  );
}
