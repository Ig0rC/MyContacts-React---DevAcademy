interface Contact {
  name: string,
  email: string,
  phone: string,
}

interface DomainContact extends Contact {
  categoryId: string;
}

export interface DomainContactResponse extends Contact {
  id: string;
  category: {
    id: string;
    name: string;
  };
}

interface PersistenceContact extends Contact {
  id: string;
  category_id: string;
  category_name: string;
}

interface PersistanceContactResponse extends Contact {
  category_id: string;
}

class ContactMapper {
  toPersistence(domainContact: DomainContact): PersistanceContactResponse {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.categoryId,
    };
  }

  toDomain(persistenceContact: PersistenceContact): DomainContactResponse {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
