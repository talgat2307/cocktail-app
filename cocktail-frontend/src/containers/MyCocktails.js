import React, { useEffect } from 'react';
import { Media } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktails } from '../store/actions/cocktailActions';

const MyCocktails = () => {

  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktail.cocktails);
  const user = useSelector(state => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);


  return (
    <div>
      <h4 className='mb-4'>My Cocktail List</h4>
      {cocktails && cocktails.map(cocktail => {
        return (
          <div key={cocktail._id}>
            {user && user._id === cocktail.user ? <Media>
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
            </Media> : ''}
          </div>
        );
      })}
    </div>
  );
};

export default MyCocktails;