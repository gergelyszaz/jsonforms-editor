/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import React from 'react';

import { Properties } from './Properties';

export interface PropertiesPanelProps {
  propertyRenderers: JsonFormsRendererRegistryEntry[];
}
export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  propertyRenderers,
}) => {
  return (
    <>
      <h1>Properties</h1>
      <Properties propertyRenderers={propertyRenderers} />
    </>
  );
};
