import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner';

interface LoaderProps {
  isLoading: boolean
}

function Loader({ isLoading }: LoaderProps): JSX.Element | null {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size="90" />
    </Overlay>,
   document.getElementById('loader-root') as HTMLElement,
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
