import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Read.css";
const Read = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");
  const getData = () => {
    axios
      .get("https://64c0c11e0d8e251fd1127fa5.mockapi.io/aakriti/CRUD")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  function handleDelete(id) {
    axios
      .delete(`https://64c0c11e0d8e251fd1127fa5.mockapi.io/aakriti/CRUD/${id}`)
      .then(() => {
        getData();
      });
  }
  const setToLocalStorage = (id, firstname, lastname, email, country, state, city, password, confirmPassword) => {
    localStorage.setItem("id", id);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("email", email);
    localStorage.setItem("country", country);
    localStorage.setItem("state", state);
    localStorage.setItem("city", city);
    localStorage.setItem("password", password);
    localStorage.setItem("confirmPassword", confirmPassword);

  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container toggle form-check form-switch">Dark Mode
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="container read_heading d-flex justify-content-between">
        <div><h4 className="read">User Data</h4></div>
        <div><Link to="/">
          <Button className="create_button btn-secondary">Create</Button>
        </Link></div>
      </div>
      <div className="container container-responsiveness-x">
        <Table striped bordered hover className={`table ${tabledark}`}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Password</th>
              <th>Confirm Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {data.map((eachData) => {
            return (
              <>
                <tbody>
                  <tr>
                    <td>{eachData.id}</td>
                    <td>{eachData.firstname}</td>
                    <td>{eachData.lastname}</td>
                    <td>{eachData.email}</td>
                    <td>{eachData.country}</td>
                    <td>{eachData.state}</td>
                    <td>{eachData.city}</td>
                    <td>{eachData.password}</td>
                    <td>{eachData.confirmPassword}</td>
                    <td>
                      <Link to="/update">
                        <Button
                          variant="success"
                          onClick={() =>
                            setToLocalStorage(
                              eachData.id,
                              eachData.firstname,
                              eachData.lastname,
                              eachData.email,
                              eachData.country,
                              eachData.state,
                              eachData.city,
                              eachData.password,
                              eachData.confirmPassword
                            )
                          }
                        >
                          Edit
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(eachData.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </Table>
      </div>
    </div>
  );
};

export default Read;
