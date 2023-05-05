import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

interface LoaderProps {
  isLoading: boolean
}

function Loader({ isLoading }: LoaderProps): JSX.Element | null {
  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size="90" />
      </Overlay>
    </ReactPortal>
  );
}

export default Loader;
