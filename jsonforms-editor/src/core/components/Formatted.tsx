/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';

interface FormattedJsonProps {
  object?: any;
}

export function FormattedJson(object: FormattedJsonProps) {
  return <pre>{JSON.stringify(object, null, 2)}</pre>;
}
