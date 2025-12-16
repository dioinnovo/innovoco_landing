'use client';

/**
 * Character Count Input Component
 *
 * A custom Sanity input component that shows a character counter
 * for text fields with max length validation.
 */

import { Stack, Text, TextArea } from '@sanity/ui';
import { useCallback } from 'react';
import { set, unset, type PatchEvent } from 'sanity';
import type { TextInputProps } from 'sanity';

// Factory function to create input with specific max length
export function createCharacterCountInput(maxLength: number) {
  return function CharacterCountInput(props: TextInputProps) {
    const { value = '', onChange, elementProps } = props;
    const charCount = (value as string).length;
    const isOverLimit = charCount > maxLength;
    const isNearLimit = charCount > maxLength * 0.8;

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextValue = event.currentTarget.value;
        // Create a proper PatchEvent with the patches
        const patch = nextValue ? set(nextValue) : unset();
        onChange(PatchEvent.from(patch));
      },
      [onChange]
    );

    return (
      <Stack space={2}>
        <TextArea
          {...elementProps}
          value={value as string}
          onChange={handleChange}
          rows={3}
        />
        <Text
          size={1}
          style={{
            color: isOverLimit ? '#dc2626' : isNearLimit ? '#d97706' : '#6b7280',
            textAlign: 'right',
          }}
        >
          {charCount}/{maxLength} characters
        </Text>
      </Stack>
    );
  };
}
