import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Update.css"

const Update = () => {
  const [id, setId] = useState(0);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("firstname"));
    setLastName(localStorage.getItem("lastname"));
    setEmail(localStorage.getItem("email"));
    setCountry(localStorage.getItem("country"));
    setState(localStorage.getItem("state"));
    setCity(localStorage.getItem("city"));
    setPassword(localStorage.getItem("password"));
    setConfirmPassword(localStorage.getItem("confirmPassword"));

  }, []);

  const validateForm = () => {
    let errors = {};

    if (!firstname.trim()) {
      errors.firstname = "First Name is required";
    }

    if (!lastname.trim()) {
      errors.lastname = "Last Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!country.trim()) {
      errors.country = "Country Name is required";
    }

    if (!state.trim()) {
      errors.state = "State Name is required";
    }

    if (!city.trim()) {
      errors.city = "City Name is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.put(`https://64c0c11e0d8e251fd1127fa5.mockapi.io/aakriti/CRUD/${id}`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        country: country,
        state: state,
        city: city,
        password: password,
        confirmpassword: confirmPassword,
      }).then(() => {
        navigate("/read");
      })
        .catch((error) => {
          console.error('Error while making the Put request:', error);
        });
    } else {
      console.log("Form has errors");
    }
  }

  return (
    <>
      <div className="main_container">
        <div className="main_sub_container">
          <div className="d-flex justify-content-between">
            <div>
              <h2 className="updateheading">Update</h2>
            </div>
            <div>
              <Link to="/read">
                <Button className="data_button">Show Data</Button>
              </Link>
            </div>
          </div>
          <Form className="form" autoComplete="off">
            <div className="flname ">
              <div className="fname">
                <Form.Group className="mb-3">
                  <Form.Label className="label">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name" value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="false"
                  /> {formErrors.firstname && <div className="error-message">{formErrors.firstname}</div>}
                </Form.Group></div>
              <div className="lname">
                <Form.Group className="mb-3">
                  <Form.Label className="label">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="false"
                  />              {formErrors.lastname && <div className="error-message">{formErrors.lastname}</div>}

                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="label">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="false"
              />   {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </Form.Group>
            <div className="nationname">
              <div className="countryname">
                <Form.Group className="mb-3">
                  <Form.Label className="label">Country Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Country Name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    autoComplete="false"
                  />
                  {formErrors.country && <div className="error-message">{formErrors.country}</div>}
                </Form.Group></div>
              <div className="statename">
                <Form.Group className="mb-3">
                  <Form.Label className="label">State Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State Name"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    autoComplete="false"
                  />      {formErrors.state && <div className="error-message">{formErrors.state}</div>}
                </Form.Group>
              </div>
              <div className="cityname">
                <Form.Group className="mb-3">
                  <Form.Label className="label">City Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City Name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="false"
                  />
                  {formErrors.city && <div className="error-message">{formErrors.city}</div>}

                </Form.Group></div>
            </div>
            <div className="password">
              <div className="typepassword">
                <Form.Group className="mb-3">
                  <Form.Label className="label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='off'
                  />       {formErrors.password && <div className="error-message">{formErrors.password}</div>}
                </Form.Group></div>
              <div className="confirmpassword">
                <Form.Group className="mb-3">
                  <Form.Label className="label">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  {formErrors.confirmPassword && <div className="error-message">{formErrors.confirmPassword}</div>}
                </Form.Group>
              </div>
            </div>
            <Button type="submit" className="update_button" onClick={handleUpdate}>
              Update
            </Button>
            <Link to="/read"><Button variant="secondary" className="back_button" type="submit"  >
              Back
            </Button></Link>
          </Form>
        </div>
      </div >
    </>
  )
}

export default Update;