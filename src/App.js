import React , { Component } from 'react';
import './App.css';

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

const isSearched = searchText => item => item.name.toLowerCase().includes(searchText.toLowerCase());

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchText: '',
      isToggleOn: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id) {
    this.setState({list: this.state.list.filter(el => {
     return el.objectID !== id;
    })})
  }

  onChangeText = (event) => {
    let text = event.target.value;
    this.setState({searchText: text});
  }

  handleText = () => {
    this.setState({isToggleOn: !this.state.isToggleOn})
  }

  render () {
    const {searchText, list, isToggleOn} = this.state;
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
          list={list}
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
        {list.filter(isSearched(pattern)).map(el => {
          return (
          <div key={el.objectID} className="table-row">
            <span style={largeColumn}>{el.name}</span>
            <span style={midColumn}>{el.author}</span>
            <span style={midColumn}>{el.rate}</span>
            <span style={smallColumn}>{el.objectID}</span>
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
