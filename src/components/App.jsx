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
    // Load contacts from localStorage on component mount
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      parsedContacts.forEach(contact => {
        dispatch(addContact(contact));
      });
    }
  }, [dispatch]);

  // Update local storage whenever contacts change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleContactSubmit = newContact => {
    dispatch(addContact(newContact));
  };

  const handleContactDelete = contactId => {
    dispatch(removeContact(contactId));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
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
