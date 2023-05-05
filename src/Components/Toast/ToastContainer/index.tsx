import { useState, useEffect, useCallback } from 'react';
import { toastEventManager } from '../../../utils/toast';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

interface IMessages {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
  duration?: number;
}

function ToastContainer(): JSX.Element {
  const [messages, setMessages] = useState<IMessages[]>([]);

  useEffect(() => {
    function handleAddToast(event: { type: string, text: string, duration?: number }): void {
      const { type, text, duration } = event;

      if (type === 'default' || type === 'success' || type === 'danger') {
        setMessages((prevState) => [
          ...prevState,
          {
            id: Math.random(), type, text, duration,
          },
        ]);
      }
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter(
      (message) => (message.id !== id),
    ));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
