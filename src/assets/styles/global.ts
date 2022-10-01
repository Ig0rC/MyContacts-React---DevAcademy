import { createGlobalStyle } from 'styled-components';
import defaultTheme from './themes/default';

type Props = {
  theme: typeof defaultTheme
}

export default createGlobalStyle<Props>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    background:  ${({ theme }) => theme.colors.primary.lighter};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray[900]}
  }

  button {
    cursor: pointer;
  }
`;
