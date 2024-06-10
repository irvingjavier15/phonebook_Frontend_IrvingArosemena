import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { fetchContacts } from './services/contactService';
import "../src/styles/App.css"

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  const getContacts = async () => {
    const contacts = await fetchContacts();
    setContacts(contacts);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className='container'>
      <ContactForm fetchContacts={getContacts} currentContact={currentContact} setCurrentContact={setCurrentContact} />
      <ContactList contacts={contacts} fetchContacts={getContacts} setCurrentContact={setCurrentContact} />
    </div>
  );
};

export default App;
