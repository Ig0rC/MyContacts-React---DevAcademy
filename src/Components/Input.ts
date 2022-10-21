import styled, { css } from 'styled-components';

interface inputProps {
  error?: string
}

export default styled.input<inputProps>`
  width: 100%;
  border: 2px solid #fff;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  height: 52px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2 ease-in;
  appearance: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
