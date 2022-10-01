import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import arrow from '../../assets/images/icons/arrow.svg';
import { Container } from './styles';

interface PageHeaderProps {
  title: string
}

function PageHeader({ title }: PageHeaderProps): JSX.Element {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="back-arrow-my-contact" />
        <span>voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
