/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Category, LayoutProps, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { Card, CardContent } from '@material-ui/core';
import React from 'react';

import { EditorLayout } from '../model/uischema';
import { DroppableLayout } from './DroppableLayout';

function CategoryLayout(props: LayoutProps) {
  const { uischema } = props;
  const categoryLayout = uischema as Category & EditorLayout;
  return (
    <Card>
      <CardContent>
        <DroppableLayout
          {...props}
          layout={categoryLayout}
          direction={'column'}
        />
      </CardContent>
    </Card>
  );
}

export const DroppableCategoryLayoutRegistration = {
  tester: rankWith(45, uiTypeIs('Category')),
  renderer: withJsonFormsLayoutProps(CategoryLayout),
};
