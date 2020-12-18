import React, { useState } from 'react';
import { addCocktail } from '../store/actions/cocktailActions';
import { useDispatch } from 'react-redux';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const AddCocktail = () => {
  const [cocktail, setCocktail] = useState({
    name: '',
    image: '',
    recipe: '',
    ingredients: [
      {
        ingredient_name: '',
        ingredient_amount: '',
      }],
  });

  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCocktail(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const ingredientChangeHandler = (i, e) => {
    const name = e.target.name;
    const value = e.target.value;

    const ingredients = [ ...cocktail.ingredients ];
    ingredients[i][name] = value;

    setCocktail({...cocktail, ingredients});
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];

    setCocktail(prevState => ({ ...prevState, [name]: file }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(cocktail).forEach(key => {
      if (Array.isArray(cocktail[key])) {
        formData.append(key, JSON.stringify(cocktail[key]));
      } else {
        formData.append(key, cocktail[key]);
      }
    });

    dispatch(addCocktail(formData));
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  const addInputHandler = () => {
    const ingredients = [...cocktail.ingredients];
    ingredients.push({
      ingredient_name: '',
      ingredient_amount: '',
    });

    setCocktail({ ...cocktail, ingredients });
  };

  const deleteInputHandler = (index) => {
    const ingredients = [...cocktail.ingredients];
    ingredients.splice(index, 1);

    setCocktail({ ...cocktail, ingredients });
  };


  return (
    <>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new Cocktail</h2>
            {alert ? <Alert variant='success'>Your cocktail is being reviewed by the Admin</Alert> : ''}
            <Form onSubmit={(e) => submitFormHandler(e)}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required={true}
                  type='text'
                  name='name'
                  value={cocktail.name}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='ingredients'>
                <Form.Label>Ingredients</Form.Label>
                {cocktail.ingredients.map((input, index) => {
                  return (
                    <Row key={index} className='mb-3'>
                      <Col lg='7'>
                        <Form.Control
                          required={true}
                          type='text'
                          name='ingredient_name'
                          placeholder='Ingredient Name'
                          value={input.ingredient_name}
                          onChange={(e) => ingredientChangeHandler(index, e)}
                        >
                        </Form.Control>
                      </Col>
                      <Col sm='3'>
                        <Form.Control
                          required={true}
                          type='text'
                          name='ingredient_amount'
                          placeholder='Amount'
                          value={input.ingredient_amount}
                          onChange={(e) => ingredientChangeHandler(index, e)}
                        >
                        </Form.Control>
                      </Col>
                      {index !== 0 ? <Col>
                        <Button
                          onClick={() => deleteInputHandler(index)}>X</Button>
                      </Col> : ''}
                    </Row>
                  );
                })}
                <div className='mt-4'>
                  <Button onClick={addInputHandler}>Add ingredient</Button>
                </div>
              </Form.Group>

              <Form.Group controlId='recipe'>
                <Form.Label>Recipe</Form.Label>
                <Form.Control
                  required={true}
                  as='textarea'
                  rows='6'
                  name='recipe'
                  value={cocktail.recipe}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>


              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.File
                  required={true}
                  name='image'
                  onChange={fileChangeHandler}
                />
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>
                Create Cocktail
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddCocktail;