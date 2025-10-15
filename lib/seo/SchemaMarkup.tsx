"use client";

import { WithContext } from 'schema-dts';

interface SchemaMarkupProps {
  schema: WithContext<any>;
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 0)
      }}
    />
  );
}
