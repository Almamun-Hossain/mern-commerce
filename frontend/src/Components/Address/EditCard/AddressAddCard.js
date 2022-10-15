import { Country, State, City } from "country-state-city";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addNewAddress } from "../../../store/reducers/features/address/addressSlice";

function AddressAddCard() {
  //let countries = Country.getAllCountries();
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  const dispatch = useDispatch();

  //for data
  const [formData, setFormData] = useState({
    country: null,
    state: null,
    city: null,
    address: null,
    zipcode: null,
    phone: null,
    secondaryPhone: null,
    name: null,
  });

  // Address add form submit
  const addAddress = (e) => {
    e.preventDefault();
    dispatch(addNewAddress(formData));
  };

  //country on change
  const countryOnChange = (e) => {
    e.preventDefault();
    let countryStates = State.getStatesOfCountry(e.target.value);
    setStates(countryStates);
    setCities(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(countryStates);
  };

  //state on change load the city
  const stateOnchange = (e) => {
    e.preventDefault();
    let stateCities = City.getCitiesOfState(formData.country, e.target.value);
    setCities(stateCities);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(stateCities);
  };

  //input onchnage the state data
  const inputOnchange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={addAddress}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Receiver name"
          onChange={inputOnchange}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Your address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          placeholder="Road:45/A, House:34, Paikpara"
          onChange={inputOnchange}
        ></Form.Control>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Select Country</Form.Label>
            <Form.Select
              id="countrySelect"
              name="country"
              onChange={countryOnChange}
            >
              <option>Select Country</option>
              {countries &&
                countries.map((country, index) => {
                  return (
                    <option
                      key={index}
                      value={country.isoCode}
                    >{`${country.flag} ${country.name}`}</option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Select Sate</Form.Label>
            <Form.Select id="stateSelect" name="state" onChange={stateOnchange}>
              <option>Select State</option>
              {states &&
                states.map((state, index) => {
                  return (
                    <option key={index} value={state.isoCode}>
                      {state.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Select City</Form.Label>
            <Form.Select id="citySelect" name="city" onChange={inputOnchange}>
              <option>Select City</option>
              {cities &&
                cities.map((city, index) => {
                  return (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              name="zipcode"
              placeholder="43434"
              onChange={inputOnchange}
              required
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="+8801755555434"
              onChange={inputOnchange}
              required
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Secondary Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="secondaryPhone"
              placeholder="+8801755555434"
              onChange={inputOnchange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default AddressAddCard;
