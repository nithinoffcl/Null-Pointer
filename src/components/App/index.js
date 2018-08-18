import React, { Component } from 'react';
import { Grid,Row } from 'react-bootstrap';
import Table from '../Table/index';
import { Button, Loading } from '../Button/index';
import Search from '../Search/index';

const DEFAULT_QUERY  = 'python';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 10;
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading ? <Loading/> : <Component {...rest}/>

//5505f264317d4e6192d5e02a28e93bc6 -- > API key

const updateTopStories = (hits, page) => prevState => {

  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];

  return {results : { ...results, [searchKey] : { hits : updatedHits,page }},isLoading : false}

}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results : null,
      searchKey : '',
      searchTerm : DEFAULT_QUERY,
      isLoading : false,
    }

    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  checkTopStoriesSearchTerm(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchTopStories(searchTerm,page) {

    this.setState( {isLoading : true} );

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setTopStories(result))
    .catch(e => e);
  }

  setTopStories(result) {
    const { hits, page } = result;

    this.setState(updateTopStories( hits, page ));
}


  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey : searchTerm });
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }

  removeItem(id) {
    const { results, searchKey } = this.state;
    const { hits, page} = results[searchKey];
    const updatedList = hits.filter(item => item.objectID !== id);
    this.setState({ results :{ ...results, [searchKey] : { hits:updatedList, page }} });
  }

  searchValue(event){
    this.setState({ searchTerm : event.target.value })
  }

  onSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey : searchTerm });
    if(this.checkTopStoriesSearchTerm(searchTerm))
    {
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  render() {

    const { results, searchTerm, searchKey, isLoading } = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="App">


      <Grid fluid>
        <Row>
          <div className = "jumbotron text-center">

            <Search
              onChange = { this.searchValue }
              value = { searchTerm }
              onSubmit = { this.onSubmit }>
                Null Pointer
            </Search>

          </div>
        </Row>
      </Grid>

  <Grid>
      <Row>

          <Table
            list = { list }
            removeItem = { this.removeItem }
          />

          <div className = "text-center">

            <ButtonWithLoading
              isLoading = { isLoading }
              type = "button"
              className = "btn btn-success"
              onClick = { () =>this.fetchTopStories(searchTerm, page+1) }>
              Load More
          </ButtonWithLoading>

        </div>
    </Row>
</Grid>

      </div>
    );
  }
}

const ButtonWithLoading = withLoading(Button);

export default App;
