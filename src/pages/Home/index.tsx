/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, ChangeEvent, useMemo, useCallback,
} from 'react';
import {
  Container, Header, ListHeader, Card, InputSearchContainer,
  ErrorContainer, EmptyListContainer, SearchNotFoundContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Loader from '../../Components/Loader/index';
import sad from '../../assets/images/sad.svg';
import ContactsService from '../../services/ContactsService';
import Button from '../../Components/Button';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category_id: string;
  category_name: string;
}

function Home(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts<Contact[]>(orderBy);

      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy(): void {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain(): void {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header justifyContent={hasError ? 'flex-end' : (contacts.length > 0 ? 'space-between' : 'center')}>
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length === 1 ? '1 contato' : `${filteredContacts.length} contatos` }
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="detailsError">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button
              isLoading={false}
              disabled={false}
              danger={false}
              type="button"
              onClick={handleTryAgain}
            >
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>

          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong>
                à cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />

              <span>
                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (<small>{contact.category_name}</small>)}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="edit-my-contacts" />
                </Link>

                <button type="button">
                  <img src={trash} alt="delete-my-contacts" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}

export default Home;
