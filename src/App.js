import React , { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


import './App.css';
library.add(faSpinner);


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP ='100'

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE= 'page=';
const PARAM_HPP = 'hitsPerPage=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

const largeColumn = { width: '40%'};
const midColumn = { width: '30%'};
const smallColumn = { width: '10%'};

//const isSearched = searchText => item => item.name.toLowerCase().includes(searchText.toLowerCase());

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchText: DEFAULT_QUERY,
      isToggleOn: true,
      isLoaded: false
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits}  
    })
  }

  onChangeText = (event) => {
    let text = event.target.value;
    this.setState({searchText: text});
  }

  handleText = () => {
    this.setState({isToggleOn: !this.state.isToggleOn})
  }

  setSearchTopStories = (result) => {
    this.setState({result});
    const {hits, page} = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits]
    this.setState({isLoaded: false})
    this.setState({hits: updatedHits, page})
  }

  onSearchSubmit = (event) => {
    const { searchText } = this.state;
    this.fetchSearchTopStories(searchText);
    event.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({isLoaded: true })
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result=> {
        this.setSearchTopStories(result.data)})
      .catch(err => err);
  }

  componentDidMount() {
    const {searchText} = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}`,{
      crossDomain:true,
    })
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error); 
  }

  render () {
    console.log(url)
    const {searchText, result, isLoaded } = this.state;
    const page = (result && result.page) || 0;
    console.log(page);
    console.log(result);
    if (!result) {
      return null;
    }

    return (
      <div className="App">
        <div className="page">
          <div className="interactions">
            <FormWithLoading
              isLoading={isLoaded}
              onChange={this.onChangeText}
              onSubmit={this.onSearchSubmit}
            > Search 
            </FormWithLoading>
          </div>
          <TableWithResult
            result={result}
            list={result}
            onDismiss={this.onDismiss}
          />
          <div className="interactions">
            <ButtonWithLoading
              isLoading = {isLoaded}
              onClick = {() => this.fetchSearchTopStories(searchText, page +1)}
            > More 
            </ButtonWithLoading>
          </div>
        </div>
      </div>
    );
  }

}

const Form = ({ onChange, children, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          onChange={onChange}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    )
}

const Button = ({onClick, children}) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

const Loading = () => <FontAwesomeIcon icon="spinner"/>

const Table = ({list, onDismiss}) => {
    return (
      <div className="table">
        {list.hits.map(el => {
          return (
          <div key={el.objectID} className="table-row">
            <span style={largeColumn}>{el.author}</span>
            <span style={midColumn}>{el.title}</span>
            <span style={midColumn}>{el.points}</span>
            <span style={smallColumn}>{el.num_comments}</span>
            <span>
              <button 
                onClick= { () => onDismiss(el.objectID)}
                type="button" className="button-inline">
              Dismiss
              </button>
            </span>
          </div>
          )
        })}
       </div>
    )
}

const withLoading = (Component) => ({isLoading, ...rest}) => 
  isLoading 
  ? <Loading />
  : <Component {...rest} />

const withResult = (Component) => ({result, ...rest}) => 
  result
  ? <Component {...rest} />
  : null

const TableWithResult = withResult(Table)
const ButtonWithLoading = withLoading(Button);
const FormWithLoading = withLoading(Form);

export default App;

export {Form, Table};
