/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import {
  defaultSchemaDecorators,
  defaultSchemaProviders,
  JsonFormsEditor,
} from '@gergelyszaz/jsonforms-editor';
import React from 'react';

import { Footer } from './components/Footer';
import { ExampleSchemaService } from './core/schemaService';

const schemaService = new ExampleSchemaService();
export const App = () => (
  <JsonFormsEditor
    schemaService={schemaService}
    schemaProviders={defaultSchemaProviders}
    schemaDecorators={defaultSchemaDecorators}
    footer={Footer}
  />
);
