import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactForm, { IContactFormRef } from '../../Components/ContactForm';
import PageHeader from '../../Components/PageHeader';
import ContactsService from '../../services/ContactsService';
import IResponseContactRequest from '../../HTTP/responses/IContactResponse';
import Loader from '../../Components/Loader';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

interface IParams {
  id: string;
}

interface IContact {
  name: string, email: string, phone: string, categoryId: string
}

function EditContact(): JSX.Element {
  const { id } = useParams<IParams>();
  const safeAsyncAction = useSafeAsyncAction();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contactName, setContactName] = useState<string>('');
  const contactFormRef = useRef<IContactFormRef>();

  useEffect(() => {
    async function loadContact(): Promise<void> {
      try {
        const contact = await ContactsService.getContactById(
          id,
        );

        safeAsyncAction(() => {
          if (contactFormRef.current?.setFieldsValues) {
            contactFormRef.current.setFieldsValues(contact);
          }

          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');

          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }
    loadContact();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(contact: IContact): Promise<void> {
    try {
      const contactData = await ContactsService
        .updateContact<IResponseContactRequest>(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditContact;
