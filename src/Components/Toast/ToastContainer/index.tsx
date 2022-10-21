import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

interface IMessages {
  id: number;
  type: 'default' | 'success' | 'danger';
  text: string;
}

function ToastContainer(): JSX.Element {
  const [messages, setMessages] = useState<IMessages[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleAddToast(event: any): void {
      const { type, text } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
