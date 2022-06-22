import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';



const Checkout = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(userActions.getAll());
    }, [dispatch])

  return (
    <React.Fragment>
      <div className="col-md-6 col-md-offset-3">
                
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
    </React.Fragment>
  )
}

export default Checkout;
