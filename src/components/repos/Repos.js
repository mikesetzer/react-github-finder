import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repos }) => {
  if (!repos) {
    // Return null, a loader, or a message if repos is not available
    return <p>No repos available.</p>;
  }

  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
}

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
