import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, setFilter } from '../redux/contactsSlice';
import { selectContacts, selectFilter } from '../redux/selectors';
import { ContactForm } from '../components/ContactForm';
import { ContactList } from '../components/ContactList';
import { Filter } from '../components/Filter';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      parsedContacts.forEach(contact => {
        dispatch(addContact(contact));
      });
    }
  }, [dispatch]);

  const handleContactSubmit = newContact => {
    dispatch(addContact(newContact));
    updateLocalStorage([...contacts, newContact]);
  };

  const handleContactDelete = contactId => {
    dispatch(removeContact(contactId));
    updateLocalStorage(contacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const updateLocalStorage = updatedContacts => {
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleContactSubmit} contacts={contacts} />
      
      <h2>Contacts</h2>
      <Filter value={filter || ''} onChange={handleFilterChange} />
      {filteredContacts.length > 0 && (
        <ContactList contacts={filteredContacts} onDeleteContact={handleContactDelete} />
      )}
    </div>
  );
};
