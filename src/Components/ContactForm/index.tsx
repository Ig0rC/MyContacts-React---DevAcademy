import {
  useState, FormEvent, ChangeEvent, useEffect, forwardRef, useImperativeHandle,
} from 'react';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useErrors from '../../hooks/useErrors';
import CategoriesServices from '../../services/CategoriesService';
import Spinner from '../Spinner';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import { DomainContactResponse } from '../../services/mappers/ContactMapper';

interface ICategories {
  id: string;
  name: string;
}

interface Props {
  buttonLabel: string;
  onSubmit: (formData:
    { name: string, email: string, phone: string, categoryId: string }
  ) => Promise<void>;
}

export interface IContactFormRef {
  setFieldsValues: (contact: DomainContactResponse) => void;
  resetFields: () => void;
}

const ContactForm = forwardRef((
  { buttonLabel, onSubmit }: Props,
  ref,
) => {
  const {
    setError,
    getErrorMessageByFieldName,
    removeError,
    errors,
  } = useErrors();

  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [categories, setCategories] = useSafeAsyncState<ICategories[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact: DomainContactResponse) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      try {
        const categoriesList = await CategoriesServices.listCategories<ICategories[]>();

        setCategories(categoriesList);
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      categoryId, email, name, phone,
    });

    setIsSubmitting(false);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório!' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>): void {
    setPhone(formatPhone(event.target.value));
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          value={name}
          onChange={handleNameChange}
          placeholder="Nome *"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          error={getErrorMessageByFieldName('email')}
          value={email}
          type="email"
          onChange={handleEmailChange}
          placeholder="E-mail"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={({ target: { value } }) => setCategoryId(value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          danger={false}
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {!isSubmitting && buttonLabel}
          {isSubmitting && <Spinner size="16" />}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

export default ContactForm;
