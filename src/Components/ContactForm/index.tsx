import {
  useState, FormEvent, ChangeEvent, useEffect,
} from 'react';
import PropTypes, { InferProps } from 'prop-types';

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

interface ICategories {
  id: string;
  name: string;
}

function ContactForm(
  { buttonLabel, onSubmit }: InferProps<typeof ContactForm.propTypes>,
): JSX.Element {
  const {
    setError,
    getErrorMessageByFieldName,
    removeError,
    errors,
  } = useErrors();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
  }, []);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit(
      name, email, phone, categoryId,
    );

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
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
