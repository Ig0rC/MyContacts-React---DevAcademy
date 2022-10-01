import PageHeader from '../../Components/PageHeader';
import ContactForm from '../../Components/ContactForm';
import ContactsService from '../../services/ContactsService';
import ICreateContactRequest from '../../HTTP/requests/ICreateContactRequest';
import IResponseContactRequest from '../../HTTP/responses/IContactResponse';

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

      const response = await ContactsService
        .createContact<ICreateContactRequest, IResponseContactRequest>(contact);

      console.log(response);
    } catch (error) {
      console.log(error.response);
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
