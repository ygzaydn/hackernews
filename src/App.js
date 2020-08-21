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
        />

       <Table
          list={list}
          onDismiss={this.onDismiss}
          pattern={searchText}
        />
      </div>
    );
  }

}

class HandleButton extends Component {
  render () {
    const { onClick, isToggleOn } = this.props
    return (
      <button
        onClick={onClick}
      > {isToggleOn ? 'YES' : 'NO'} 
      </button>
    )
  }
}

class Form extends Component {
  render () {
    const { searchText, onChange } = this.props;
    return (
      <form>
        <input 
          type="text"
          onChange={onChange}
        />
        <span>{searchText}</span>
      </form>
    )
  }
}

class Table extends Component {
  render () {
    const { list, onDismiss, pattern } = this.props;
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
  
  
}


export default App;
