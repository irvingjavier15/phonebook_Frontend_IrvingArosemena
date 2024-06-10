import PropTypes from "prop-types";
import axios from "axios";
import "../styles/ContactList.css"


const ContactList = ({ contacts, fetchContacts, setCurrentContact }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  return (
    <div className="listContainer">
      <h2 className="contactListTitle">Lista de Contactos</h2>
      <ul className="contactList">
        {contacts.map((contact) => (
          <li key={contact._id} className="contactCard">
            <div className="contactInfo">
              <span className="contactName">{contact.name} {contact.lastname}</span>
              <span className="contactDetails">Age: {contact.age}</span>
              <span className="contactDetails">Phone: {contact.phone}</span>
            </div>
            <div className="contactActions">
              <button className="editButton" onClick={() => setCurrentContact(contact)}>Edit</button>
              <button className="deleteButton" onClick={() => handleDelete(contact._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string,
      age: PropTypes.number,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchContacts: PropTypes.func.isRequired,
  setCurrentContact: PropTypes.func.isRequired,
};

export default ContactList;
