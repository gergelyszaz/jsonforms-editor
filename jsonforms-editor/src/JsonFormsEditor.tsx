/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import './JsonFormsEditor.css';

import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import {
  CategorizationService,
  CategorizationServiceImpl,
} from './core/api/categorizationService';
import {
  DefaultPaletteService,
  PaletteService,
} from './core/api/paletteService';
import { EmptySchemaService, SchemaService } from './core/api/schemaService';
import { EditorContextInstance } from './core/context';
import { Actions, editorReducer } from './core/model';
import { SelectedElement } from './core/selection';
import { tryFindByUUID } from './core/util/schemasUtil';
import { defaultEditorRenderers, EditorPanel } from './editor';
import { PalettePanel } from './palette-panel';
import { defaultPropertyRenderers, PropertiesPanel } from './properties';
import {
  PropertiesService,
  PropertiesServiceImpl,
  PropertySchemasDecorator,
  PropertySchemasProvider,
} from './properties/propertiesService';

const useStyles = makeStyles((theme) => ({
  pane: {
    minHeight: '200px',
    margin: theme.spacing(0, 1, 0, 1),
    height: '100%',
  },
  leftPane: {},
  centerPane: {
    alignItems: 'stretch',
  },
  rightPane: {},
}));

interface JsonFormsEditorProps {
  schemaService?: SchemaService;
  schemaProviders: PropertySchemasProvider[];
  schemaDecorators: PropertySchemasDecorator[];
  paletteService?: PaletteService;
  editorRenderers?: JsonFormsRendererRegistryEntry[];
  propertyRenderers?: JsonFormsRendererRegistryEntry[];

  propertiesServiceProvider?: (
    schemaProviders: PropertySchemasProvider[],
    schemaDecorators: PropertySchemasDecorator[]
  ) => PropertiesService;
  categorizationService?: CategorizationService;
}
const defaultSchemaService = new EmptySchemaService();
const defaultPaletteService = new DefaultPaletteService();
const defaultPropertiesService = (
  schemaProviders: PropertySchemasProvider[],
  schemaDecorators: PropertySchemasDecorator[]
) => new PropertiesServiceImpl(schemaProviders, schemaDecorators);
const defaultCategorizationService = new CategorizationServiceImpl();

export function JsonFormsEditor({
  schemaService = defaultSchemaService,
  paletteService = defaultPaletteService,
  categorizationService = defaultCategorizationService,
  propertiesServiceProvider = defaultPropertiesService,
  schemaProviders,
  schemaDecorators,
  editorRenderers = defaultEditorRenderers,
  propertyRenderers = defaultPropertyRenderers,
}: JsonFormsEditorProps) {
  const [{ schema, uiSchema }, dispatch] = useReducer(editorReducer, {
    categorizationService: defaultCategorizationService,
  });
  const [selection, setSelection] = useState<SelectedElement>(undefined);

  const [propertiesService] = useState<PropertiesService>(
    propertiesServiceProvider(schemaProviders, schemaDecorators)
  );

  useEffect(() => {
    schemaService
      .getSchema()
      .then((schema) => dispatch(Actions.setSchema(schema)));
    schemaService
      .getUiSchema()
      .then((uiSchema) => dispatch(Actions.setUiSchema(uiSchema)));
  }, [schemaService]);
  useEffect(() => {
    setSelection((oldSelection) => {
      if (!oldSelection) {
        return oldSelection;
      }
      const idInNewSchema = tryFindByUUID(uiSchema, oldSelection.uuid);
      if (!idInNewSchema) {
        // element does not exist anymore - clear old selection
        return undefined;
      }
      return oldSelection;
    });
  }, [uiSchema]);
  return (
    <EditorContextInstance.Provider
      value={{
        schema,
        uiSchema,
        dispatch,
        selection,
        setSelection,
        categorizationService,
        schemaService,
        paletteService,
        propertiesService,
      }}
    >
      <DndProvider backend={Backend}>
        <JsonFormsEditorUi
          editorRenderers={editorRenderers}
          propertyRenderers={propertyRenderers}
        />
      </DndProvider>
    </EditorContextInstance.Provider>
  );
}

interface JsonFormsEditorUiProps {
  editorRenderers: JsonFormsRendererRegistryEntry[];
  propertyRenderers: JsonFormsRendererRegistryEntry[];
}
function JsonFormsEditorUi({
  editorRenderers,
  propertyRenderers,
}: JsonFormsEditorUiProps) {
  const classes = useStyles();
  return (
    <div>
      <div className={`${classes.pane} ${classes.leftPane}`}>
        <PalettePanel />
        <PropertiesPanel propertyRenderers={propertyRenderers} />
      </div>
      <div className={`${classes.pane} ${classes.rightPane}`}>
        <EditorPanel editorRenderers={editorRenderers} />
      </div>
    </div>
  );
}
