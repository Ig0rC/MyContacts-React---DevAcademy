import { Container } from './styles';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

interface Props {
  text: string;
  type?: 'success' | 'default' | 'danger';
}

function ToastMessage({ text, type = 'default' } : Props): JSX.Element {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xCircleIcon} alt="icon-danger" />}
      {type === 'success' && <img src={checkCircleIcon} alt="check" />}
      <strong>{text}</strong>
    </Container>
  );
}

export default ToastMessage;
