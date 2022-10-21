import PageHeader from '../../Components/PageHeader';
import ContactForm from '../../Components/ContactForm';
import ContactsService from '../../services/ContactsService';
import ICreateContactRequest from '../../HTTP/requests/ICreateContactRequest';
import IResponseContactRequest from '../../HTTP/responses/IContactResponse';
import toast from '../../utils/toast';

function NewContact(): JSX.Element {
  async function handleSubmit(
    name: string, email: string, phone: string, categoryId: string,
  ): Promise<void> {
    try {
      const contact = {
        name,
        email,
        phone,
        category_id: categoryId,
      };

      await ContactsService
        .createContact<ICreateContactRequest, IResponseContactRequest>(contact);

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
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
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default NewContact;
