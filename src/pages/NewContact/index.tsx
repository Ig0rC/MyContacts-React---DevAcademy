import { useRef } from 'react';
import PageHeader from '../../Components/PageHeader';
import ContactForm, { IContactFormRef } from '../../Components/ContactForm';
import ContactsService from '../../services/ContactsService';
import IResponseContactRequest from '../../HTTP/responses/IContactResponse';
import toast from '../../utils/toast';

interface Contact {
  name: string, email: string, phone: string, categoryId: string
}

function NewContact(): JSX.Element {
  const contactFormRef = useRef<IContactFormRef>(null);

  async function handleSubmit(contact: Contact): Promise<void> {
    try {
      await ContactsService
        .createContact<IResponseContactRequest>(contact);

      if (contactFormRef.current) {
        contactFormRef.current.resetFields();
      }

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }

  return (
    <>
      <PageHeader
        title="Novo contato"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
