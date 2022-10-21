import { StyledSpinner } from './styles';

interface Props {
  size: string;
}

export default function Spinner({ size } : Props): JSX.Element {
  return <StyledSpinner size={size} />;
}
