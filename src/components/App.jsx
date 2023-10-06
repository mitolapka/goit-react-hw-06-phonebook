import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
        setLoading(false);
    }, []);

    const handleContactSubmit = (newContact) => {
        setContacts((prevContacts) => [...prevContacts, newContact]);
        updateLocalStorage([...contacts, newContact]);
    };

    const handleContactDelete = (contactId) => {
        setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactId)
        );
        updateLocalStorage(contacts.filter((contact) => contact.id !== contactId));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const updateLocalStorage = (updatedContacts) => {
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            {loading && <div>Loading...</div>}
            <h1>Phonebook</h1>
            <ContactForm onSubmit={handleContactSubmit} contacts={contacts} />

            <h2>Contacts</h2>
            <Filter value={filter} onChange={handleFilterChange} />
            {filteredContacts.length > 0 && (
                <ContactList contacts={filteredContacts} onDeleteContact={handleContactDelete} />
            )}
        </div>
    );
};


