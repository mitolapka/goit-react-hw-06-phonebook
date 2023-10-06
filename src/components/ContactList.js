import { ContactItem } from './ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact, selectContacts } from './redux';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={() => dispatch(removeContact(contact.id))}
        />
      ))}
    </ul>
  );
};

