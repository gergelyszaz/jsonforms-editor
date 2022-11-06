/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';

export const StyledTreeView = TreeView;

interface StyledTreeItemProps {
  isDragging: boolean;
}

export const StyledTreeItem = ({
  isDragging,
  ...props
}: StyledTreeItemProps & TreeItemProps) => <TreeItem {...props} />;
