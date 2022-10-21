import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import Spinner from '../Spinner';
import { Container } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
  isLoading?: boolean;
}

function FormGroup({ children, error, isLoading }: FormGroupProps): JSX.Element {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size="16" />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}

export default FormGroup;

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
