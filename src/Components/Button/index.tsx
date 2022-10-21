import React from 'react';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

interface Props {
  type: 'button' | 'submit' | 'reset';
  disabled: boolean,
  isLoading: boolean,
  children: React.ReactNode;
  danger?: boolean,
  onClick?: () => void;
}

function Button({
  disabled, isLoading, type, children, danger = false, onClick,
} : Props): JSX.Element {
  return (
    <StyledButton
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      danger={danger}
    >
      {!isLoading && children}
      {isLoading && <Spinner size="16" />}
    </StyledButton>
  );
}

export default Button;
