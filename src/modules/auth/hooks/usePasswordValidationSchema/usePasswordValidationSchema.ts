import { useMemo } from 'react';

import { string } from 'yup';

import useTranslation from '../../../shared/hooks/useTranslation';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

interface ErrorMessages {
  required?: string;
  pattern?: string;
}

export const usePasswordValidationSchema = (
  messageConfig: ErrorMessages = {}
) => {
  const [translate] = useTranslation();
  return useMemo(() => {
    return string()
      .required(
        messageConfig.required ??
          translate('components>form>requiredFieldValidation')
      )
      .min(8, 'Minimo 8 caracteres')
      .matches(
        passwordRegex,
        messageConfig.pattern ??
          translate('auth>passwordErrorFeedback>genericInvalidMessage')
      );
  }, [translate, messageConfig]);
};
