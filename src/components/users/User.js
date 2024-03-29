import React, { useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import Repos from '../repos/Repos';

const User = ({ getUser, user, loading, getRepos, repos }) => {
  let { login } = useParams();

  useEffect(() => {
    getUser(login);
  }, [login, getUser]);

  useEffect(() => {
    getRepos(login);
  }, [login, getRepos]);

  User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
  }

  if (loading) {
    return <Spinner />;
  }

  const { 
    name, 
    avatar_url, 
    location,
    company,
    bio, 
    blog,
    html_url, 
    followers, 
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>Back to Search</Link>
      Hireable: {' '}
      {hireable ? <i className="fa fa-check text-success" /> : <i className="fa fa-times-circle text-danger" />}

      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} className="round-img" alt="" style={{ width: '150px'}} />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && <Fragment>
            <h3>Bio</h3>
            <p>{bio}</p>  
          </Fragment>}
          <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
          <ul>
            <li>
              {login && <Fragment>
                <strong>Username: {login}</strong>  
              </Fragment>}
            </li>
            <li>
              {company && <Fragment>
                <strong>Company: {company}</strong>  
              </Fragment>}
            </li>
            <li>
              {blog && <Fragment>
                <strong>Website: {blog}</strong>  
              </Fragment>}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className='badge badge-primary'>Followers:{followers}</div>
        <div className='badge badge-success'>Following:{following}</div>
        <div className='badge badge-light'>Public Repos:{public_repos}</div>
        <div className='badge badge-dark'>Public Gists:{public_gists}</div>
      </div>
      <div className="card text-center">
        <h3>Recent Repos:</h3>
        <Repos repos={repos} />
      </div>

    </Fragment>
  );
}

export default User
