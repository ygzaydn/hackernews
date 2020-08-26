import React , { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const list = [
  {
    name: 'React',
    author: 'Facebook',
    rate: 5,
    objectID: 12
  },
  {
    name: 'Angular',
    author: 'Google',
    rate: 3,
    objectID: 1
  }
];

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
      isToggleOn: true
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
    const {searchText, result, isToggleOn} = this.state;
    console.log(result);
    if (!result) {
      return null;
    }

    return (
      <div className="App">
        <HandleButton
          onClick={this.handleText}
          isToggleOn={isToggleOn}
        />
        <div className="page">
          <div className="interactions">
            <Form
            onChange={this.onChangeText}
            searchText={searchText}
            > Search
            </Form>
          </div>
          <Table
          list={result}
          onDismiss={this.onDismiss}
          pattern={searchText}
          />
        </div>
      </div>
    );
  }

}

const HandleButton = ({onClick, isToggleOn}) => {
  return (
    <button
    onClick={onClick}
  > {isToggleOn ? 'YES' : 'NO'} 
  </button>
  )
}

const Form = ({ searchText, onChange, children }) => {
    return (
      <form>
        {children}
        <input 
          type="text"
          onChange={onChange}
        />
        <span>{searchText}</span>
      </form>
    )
}

const Table = ({list, onDismiss, pattern}) => {
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

export default App;
