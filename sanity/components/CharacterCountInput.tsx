'use client';

/**
 * Character Count Input Component
 *
 * A custom Sanity input component that shows a character counter
 * for text fields with max length validation.
 */

import { Stack, Text, TextArea } from '@sanity/ui';
import { useCallback } from 'react';
import type { StringInputProps, TextInputProps } from 'sanity';

interface CharacterCountInputProps extends Omit<TextInputProps, 'renderDefault'> {
  maxLength: number;
}

export function CharacterCountTextInput(props: CharacterCountInputProps) {
  const { value = '', onChange, maxLength } = props;
  const charCount = value.length;
  const isOverLimit = charCount > maxLength;
  const isNearLimit = charCount > maxLength * 0.8;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.currentTarget.value ? event.currentTarget.value : undefined);
    },
    [onChange]
  );

  return (
    <Stack space={2}>
      <TextArea
        value={value}
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
}

// Factory function to create input with specific max length
export function createCharacterCountInput(maxLength: number) {
  return function CharacterCountInput(props: TextInputProps) {
    const { value = '', onChange } = props;
    const charCount = (value as string).length;
    const isOverLimit = charCount > maxLength;
    const isNearLimit = charCount > maxLength * 0.8;

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.currentTarget.value ? event.currentTarget.value : undefined);
      },
      [onChange]
    );

    return (
      <Stack space={2}>
        <TextArea
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
