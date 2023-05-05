import React from 'react';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import { Overlay, Container, Footer } from './styles';

interface modalProps {
  danger: boolean;
  title: string;
  children: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  isLoading?: boolean;
}

function Modal({
  danger, title, children, cancelLabel = 'Cancelar', confirmLabel = 'Confirmar', visible, onCancel, onConfirm, isLoading = false,
}: modalProps): JSX.Element | null {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              onClick={onCancel}
              className="cancel-button"
              type="button"
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              onClick={onConfirm}
              disabled={false}
              isLoading={isLoading}
              danger
              type="button"
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

export default Modal;
