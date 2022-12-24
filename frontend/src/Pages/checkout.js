import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import {
  addressState,
  fetchUserAddress,
} from "../store/reducers/features/address/addressSlice";

function Checkout() {
  const [file, setFile] = useState(null)

  const [categoryName, setcategoryName] = useState('')

  //get auth data from the redux state
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  //get all addresses form the redux state for an user
  const { addresses } = useSelector(addressState);

  //use dispatch from redux to dispatch our action
  const dispatch = useDispatch();

  //navigate to another page using useNavigate from react-router
  const navigate = useNavigate();


  //function upload files
  const uploadFile = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', categoryName);
    formData.append('thumb', file)
    let data = {
      categoryName, thumb: file
    }

    // axios.post('http://localhost:4040/api/v1/category/test', formData, { withCredentials: true})
    //   .then((date) => console.log(data)).catch(error => console.log(error))
  }

  //use effect to render page data on change
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(fetchUserAddress());
  }, [dispatch, isAuthenticated]);

  return (
    <Fragment>
      <Header />
      <Container>
        <div className="w-50 mx-auto">
          <h1 className="text-center py-2">Create a New Category</h1>
          <Form onSubmit={uploadFile}>
            <Form.Group className="mb-2">
              <Form.Label>Category Name</Form.Label>

              <Form.Control type="text" name="name" accept="image/*" onChange={(e) => setcategoryName(e.target.value)} placeholder="choose your file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Input file</Form.Label>

              <Form.Control type="file" name="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} placeholder="choose your file" />
            </Form.Group>
            <Button type="submit">Upload File</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Checkout;
