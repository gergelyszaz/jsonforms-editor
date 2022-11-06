/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { makeStyles } from '@material-ui/core';
import React from 'react';

import { usePaletteService, useSchema } from '../../core/context';
import { SchemaElement } from '../../core/model';
import { SchemaTreeView } from './SchemaTree';
import { UIElementsTree } from './UIElementsTree';

const useStyles = makeStyles((theme) => ({
  uiElementsTree: {
    marginBottom: theme.spacing(1),
  },
  palettePanel: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export interface PaletteTab {
  name: string;
  Component: React.ReactElement;
}

export const PalettePanel: React.FC = () => {
  const schema: SchemaElement | undefined = useSchema();
  const paletteService = usePaletteService();
  const classes = useStyles();
  return (
    <div className={classes.palettePanel}>
      <h1>Palette</h1>
      <UIElementsTree
        className={classes.uiElementsTree}
        elements={paletteService.getPaletteElements()}
      />
      <SchemaTreeView schema={schema} />
    </div>
  );
};
