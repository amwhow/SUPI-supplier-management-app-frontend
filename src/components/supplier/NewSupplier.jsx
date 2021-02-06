import React, { useReducer } from "react";
import reducer from "../../utils/reducer";
import Grid from "@material-ui/core/Grid";
import { Form } from "../styles/Form";
import FormContainer from "../styles/FormContainer";
import Button from "@material-ui/core/Button";

function NewSupplier({ history }) {
  const initialSupplierState = {
    name: "",
    service: "",
    website: "",
    contactName: "",
    contactEmail: "",
    contactNumber: "",
    description: "",
    note: "",
  };

  // recommend we add a function to set today's date as the min value for date inputs

  const [store, dispatch] = useReducer(reducer, initialSupplierState);
  const {
    name,
    service,
    website,
    contactName,
    contactEmail,
    contactNumber,
    description,
    note,
  } = store;

  const handleChange = (e) => {
    dispatch({
      type: `set${e.target.name}`,
      data: e.target.value,
    });
  };

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      supplier: {
        name: name,
        service: service,
        website: website,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_number: contactNumber,
        description: description,
        note: note,
      },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/suppliers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      history.push("/dashboard/suppliers");
      alert("Supplier created");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <FormContainer>
      <Grid item xs={12} sm={8}>
        <h1 className="new-doc-header">New Supplier</h1>
        <Form className="new-invoice-form" onSubmit={onFormSubmit}>
          <div className="form-content">
            <label htmlFor="name">Supplier name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="service">Service</label>
            <input
              type="text"
              name="service"
              id="service"
              value={service}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="website">Website url</label>
            <input
              type="text"
              name="website"
              id="website"
              value={website}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="contactName">Supplier contact name</label>
            <input
              type="text"
              name="contact_name"
              id="contactName"
              value={contactName}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="contactEmail">Supplier contact email</label>
            <input
              type="email"
              name="contact_email"
              id="contactEmail"
              value={contactEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="contactNumber">Supplier contact number</label>
            <input
              type="text"
              name="contact_number"
              id="contactNumber"
              value={contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <label htmlFor="note">Note</label>
            <input
              type="text"
              name="note"
              id="note"
              value={note}
              onChange={handleChange}
            />
          </div>
          <div className="form-content">
            <Button
              type="submit"
              variant="contained"
              value="Add Supplier"
              id="submit"
              color="primary"
            >
              Create
            </Button>
          </div>
        </Form>
      </Grid>
    </FormContainer>
  );
}

export default NewSupplier;
