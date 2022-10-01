import ContactForm from '../../Components/ContactForm';
import PageHeader from '../../Components/PageHeader';
import ContactsService from '../../services/ContactsService';

function EditContact(): JSX.Element {
  async function handleSubmit(
    name: string, email: string, phone: string, categoryId: string,
  ): Promise<void> {
    const contact = {
      name,
      email,
      phone,
      category_id: categoryId,
    };

    const response = await ContactsService.createContact(contact);
  }

  return (
    <>
      <PageHeader
        title="Editar contato"
      />
      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditContact;
