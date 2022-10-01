import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { Overlay, Container, Footer } from './styles';

interface modalProps {
  danger: boolean;
}

function Modal({ danger }: modalProps): JSX.Element {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza que deseja remover o contato Igor Cardoso?</h1>
        <p>
          corpo do modal
        </p>

        <Footer>
          <button
            className="cancel-button"
            type="button"
          >
            Cancelar
          </button>
          <Button danger type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root') as HTMLElement,
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};

export default Modal;
