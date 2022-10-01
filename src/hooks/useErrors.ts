import { useState } from 'react';

interface iErrors {
  field: string;
  message: string;
}

interface iSetError {
  field: string;
  message: string;
}

interface iUseErrors {
  readonly setError: ({ field, message }: iSetError) => void;
  readonly removeError: (fieldName: string) => void;
  readonly getErrorMessageByFieldName: (fieldName: string) => string | undefined;
  readonly errors: iErrors[];
}

export default function useErrors(): iUseErrors {
  const [errors, setErrors] = useState<iErrors[]>([]);

  function setError({ field, message }: iSetError): void {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName: string): void {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldName: string): string | undefined {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
    errors,
  };
}
