/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';

import { TabContent } from '../../core/components';
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
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  const schema: SchemaElement | undefined = useSchema();
  const paletteService = usePaletteService();
  const classes = useStyles();
  return (
    <div className={classes.palettePanel}>
      <Tabs value={selectedTab} onChange={handleTabChange} variant='scrollable'>
        <Tab label='Palette' data-cy='palette-tab' />
      </Tabs>
      <TabContent index={0} currentIndex={selectedTab}>
        <UIElementsTree
          className={classes.uiElementsTree}
          elements={paletteService.getPaletteElements()}
        />
        <SchemaTreeView schema={schema} />
      </TabContent>
    </div>
  );
};
