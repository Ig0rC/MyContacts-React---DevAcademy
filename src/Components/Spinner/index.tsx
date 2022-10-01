import PropTypes from 'prop-types';
import { StyledSpinner } from './styles';

interface Props {
  fontSize: string;
}

export default function Spinner({ fontSize } : Props): JSX.Element {
  return <StyledSpinner fontSize={fontSize} />;
}

Spinner.propTypes = {
  fontSize: PropTypes.number.isRequired,
};
