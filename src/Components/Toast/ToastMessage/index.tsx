import { useEffect } from 'react';

import { Container } from './styles';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

interface Props {
  message: {
    id: number;
    text: string;
    type: 'default' | 'success' | 'danger';
    duration?: number;
  }
  onRemoveMessage: (id: number) => void;
}

function ToastMessage({ onRemoveMessage, message } : Props): JSX.Element {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, message]);

  function handleRemoveToast(): void {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      onClick={handleRemoveToast}
      type={message.type}
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="icon-danger" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

export default ToastMessage;
