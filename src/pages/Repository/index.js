import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import { Loading, Owenr, IssueList } from './styled';
import Container from '../../components/Container/index';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { name } = this.props.match.params;
    const repoName = decodeURIComponent(name);

    // api.github.com/repos/rocketseat/unform
    // api.github.com/repos/rocketseat/unform/issues

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);
    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owenr>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owenr>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
export default Repository;
