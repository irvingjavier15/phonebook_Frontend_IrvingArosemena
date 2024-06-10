import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../styles/ContactForm.css";

const ContactForm = ({ fetchContacts, currentContact, setCurrentContact }) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setLastname(currentContact.lastname);
      setAge(currentContact.age);
      setPhone(currentContact.phone);
    }
  }, [currentContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = { name, lastname, age, phone };
      if (currentContact) {
        await axios.patch(
          `http://localhost:3001/contacts/${currentContact._id}`,
          contactData
        );
        setCurrentContact(null);
      } else {
        await axios.post("http://localhost:3001/contacts", contactData);
      }
      fetchContacts();
      setName("");
      setLastname("");
      setAge("");
      setPhone("");
    } catch (error) {
      console.error("Error saving contact", error);
    }
  };

  return (
    <div className="contactFormContainer">
      <h1 className="contactFormTitle">Agregar Contacto</h1>
      <form className="formContainer" onSubmit={handleSubmit}>
        
        <div className="nameLastNameContainer">
          <div className="nameContainer">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="lastnameContainer">
            <label>Lastname</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="ageContainer">
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="phoneContainer">
          <label>Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button className="btnSubmit" type="submit">
          {currentContact ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  fetchContacts: PropTypes.func.isRequired,
  currentContact: PropTypes.shape({
    name: PropTypes.string,
    lastname: PropTypes.string,
    age: PropTypes.number,
    phone: PropTypes.string,
    _id: PropTypes.string,
  }),
  setCurrentContact: PropTypes.func.isRequired,
};

export default ContactForm;
