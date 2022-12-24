import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../../store/reducers/features/address/addressSlice";

function AddressEditCard({ data }) {
  //inital default state for country, state, city
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState(State.getStatesOfCountry(data.country.isoCode));
  const [cities, setCities] = useState(City.getCitiesOfState(data.country.isoCode, data.state.isoCode));

  //initialize redux dispatch
  const dispatch = useDispatch();

  //for data
  const [formData, setFormData] = useState({
    country: data.country.isoCode,
    state: data.state?.isoCode,
    city: data.city?.name,
    address: data.address,
    zipcode: data.zipcode,
    phone: data.phone,
    secondaryPhone: data.secondaryPhone,
    name: data.name,
  });

  //country on change set state/district data
  const countryOnChange = (e) => {
    e.preventDefault();
    let countryStates = State.getStatesOfCountry(e.target.value);
    setStates(countryStates);
    setCities(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  //state on change load the city
  const stateOnchange = (e) => {
    e.preventDefault();
    let stateCities = City.getCitiesOfState(formData.country, e.target.value);
    setCities(stateCities);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  //input onchange the state data
  const inputOnchange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  //form submit handler 
  const formSubmit = (e) => {
    e.preventDefault();
    let value = {
      formData: formData,
      addressId: data._id
    }
    dispatch(updateAddress(value));
  }
  return (
    <Form onSubmit={formSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          defaultValue={formData.name}
          placeholder="Receiver name"
          onChange={inputOnchange}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Your address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          defaultValue={formData.address}
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
              defaultValue={formData.country}
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
            <Form.Select id="stateSelect" name="state" defaultValue={formData.state} onChange={stateOnchange}>
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
            <Form.Select id="citySelect" name="city" defaultValue={formData.city} onChange={inputOnchange}>
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
              defaultValue={formData.zipcode}
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
              defaultValue={formData.phone}
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
              defaultValue={formData.secondaryPhone ? formData.secondaryPhone : ""}
              placeholder="+8801755555434"
              onChange={inputOnchange}
            ></Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit">Update</Button>
    </Form>
  );
}

export default AddressEditCard;
