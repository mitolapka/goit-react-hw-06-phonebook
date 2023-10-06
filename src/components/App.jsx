import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, setFilter, selectContacts, selectFilter } from './redux';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

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
    contact.name && contact.name.toLowerCase().includes(filter && filter.toLowerCase())
  );


};
