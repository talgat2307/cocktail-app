import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCocktail,
  fetchCocktails, publishCocktail,
} from '../store/actions/cocktailActions';
import { Button, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cocktails = () => {

  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktail.cocktails);
  const user = useSelector(state => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteCocktail(id));
  };

  const publishHandler = (id) => {
    dispatch(publishCocktail(id));
  };

  let cocktailPage;

  if (user && user.role === 'admin') {
    cocktailPage = (
      <>
        <h4 className='mb-4'>Admin Page</h4>
        {cocktails && cocktails.map(cocktail => {
          return (
            <Media key={cocktail._id}>
              <img
                width={90}
                height={90}
                className="mr-3"
                src={`http://localhost:8000/uploads/${cocktail.image}`}
                alt=""
              />
              <Media.Body>
                <h5>{cocktail.name}</h5>
                <p>{cocktail.recipe}</p>
                {cocktail.ingredients.map(i => {
                  return (
                    <li>{i.ingredient_name}: {i.ingredient_amount}</li>
                  );
                })}
              </Media.Body>
              {cocktail.published ?
                <p className='published text-success'>Published</p>
                :
                <p className='published text-danger'>Unpublished</p>}
              <div className='cocktailBtn'>
                <Button
                  className='mr-3'
                  variant='success'
                  onClick={() => publishHandler(cocktail._id)}
                >
                  Publish</Button>
                <Button
                  variant='danger'
                  onClick={() => deleteHandler(cocktail._id)}
                >Delete</Button>
              </div>
            </Media>
          );
        })}
      </>
    );
  }

  if (user && user.role === 'user') {
    cocktailPage = (
      <>
        <h4 className='mb-4'>All Cocktail List</h4>
        {cocktails && cocktails.map(cocktail => {
          return (
            <div key={cocktail._id}>
              {cocktail.published ? <Media>
                <img
                  width={90}
                  height={90}
                  className="mr-3"
                  src={`http://localhost:8000/uploads/${cocktail.image}`}
                  alt=""
                />
                <Media.Body>
                  <h5>{cocktail.name}</h5>
                  <p>{cocktail.recipe}</p>
                  {cocktail.ingredients.map(i => {
                    return (
                      <li>{i.ingredient_name}: {i.ingredient_amount}</li>
                    );
                  })}
                </Media.Body>
              </Media> : ''}
            </div>
          );
        })}
      </>
    );
  }

  if (!user) {
    cocktailPage = (
      <div className='d-flex justify-content-center'>
        <h2>To watch the cocktail list please <Button
            variant='outline-primary'
            as={Link}
            to={'/login'}>Login
          </Button> first
        </h2>
      </div>
    );
  }

  return (
    <div>
      {cocktailPage}
    </div>
  );
};

export default Cocktails;