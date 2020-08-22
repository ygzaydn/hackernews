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

        <Form
          onChange={this.onChangeText}
          searchText={searchText}
        > Search
        </Form>

       <Table
          list={list}
          onDismiss={this.onDismiss}
          pattern={searchText}
        />
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
      <div>
        {list.filter(isSearched(pattern)).map(el => {
          return (
          <div key={el.objectID}>
            <span>{el.name}</span>
            <span>{el.author}</span>
            <span>{el.rate}</span>
            <span>{el.objectID}</span>
            <span>
              <button 
                onClick= { () => onDismiss(el.objectID)}
                type="button">
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
