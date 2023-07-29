import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Create.css";

const Create = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const history = useNavigate();
    const header = { "Access-control-Allow-Origin": "*" };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post("https://64c0c11e0d8e251fd1127fa5.mockapi.io/aakriti/CRUD", {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    country: country,
                    state: state,
                    city: city,
                    password: password,
                    confirmPassword: confirmPassword,
                })
                .then((response) => {
                    history("/read");
                    console.log("Post request successful:", response);
                })
                .catch((error) => {
                    console.error("Error while making the POST request:", error);
                });
        } else {
            console.log("Form has errors");
        }
    };

    return (
        <>
            <header className="navbar d-flex justify-content-around">
                <div>
                    <Link to="/" className="logo">
                        AR-CRUD
                    </Link>
                </div>

                <div className="links">
                    <Link to="/" className="nav">
                        Home
                    </Link>
                    <Link to="/read" className="nav">
                        Show list
                    </Link>
                </div>
            </header>

            <div className="main_container">
                <div className="main_sub_container">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h2 className="createheading">CREATE</h2>
                        </div>
                        <div>
                            <Link to="/read">
                                <Button className="button">Show Data</Button>
                            </Link>
                        </div>
                    </div>
                    <Form className="form" autoComplete="off" onSubmit={handleSubmit}>
                        <div className="flname">
                            <div className="fname">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) => setFirstname(e.target.value)}
                                        autoComplete="false"
                                    />
                                    {formErrors.firstname && (
                                        <div className="error-message">{formErrors.firstname}</div>
                                    )}
                                </Form.Group>
                            </div>
                            <div className="lname">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) => setLastname(e.target.value)}
                                        autoComplete="false"
                                    />
                                    {formErrors.lastname && (
                                        <div className="error-message">{formErrors.lastname}</div>
                                    )}
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="false"
                            />
                            {formErrors.email && (
                                <div className="error-message">{formErrors.email}</div>
                            )}
                        </Form.Group>
                        <div className="nationname">
                            <div className="countryname">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Country Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Country Name"

                                        onChange={(e) => setCountry(e.target.value)}
                                        autoComplete="false"
                                    />{formErrors.country && (
                                        <div className="error-message">{formErrors.country}</div>
                                    )}
                                </Form.Group></div>
                            <div className="statename">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">State Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="State Name"

                                        onChange={(e) => setState(e.target.value)}
                                        autoComplete="false"
                                    />{formErrors.state && (
                                        <div className="error-message">{formErrors.state}</div>
                                    )}
                                </Form.Group>
                            </div>
                            <div className="cityname">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">City Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City Name"

                                        onChange={(e) => setCity(e.target.value)}
                                        autoComplete="false"
                                    />{formErrors.city && (
                                        <div className="error-message">{formErrors.city}</div>
                                    )}
                                </Form.Group></div>
                        </div>
                        <div className="password">
                            <div className="typepassword">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='off'
                                    />{formErrors.password && (
                                        <div className="error-message">{formErrors.password}</div>
                                    )}
                                </Form.Group></div>
                            <div className="confirmpassword">
                                <Form.Group className="mb-3">
                                    <Form.Label className="label">Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />{formErrors.confirmPassword && (
                                        <div className="error-message">{formErrors.confirmPassword}</div>
                                    )}
                                </Form.Group>
                            </div>
                        </div>
                        <Button type="submit" className="button" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; Copyright Aakriti. All right reserved</p>
            </div>
        </>
    );
};

export default Create;


