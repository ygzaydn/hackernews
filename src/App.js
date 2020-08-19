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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchText: ''
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

  render () {
    return (
      <div className="App">
        <form>
          <input type="text"
                  onChange={this.onChangeText} />
          <span>{this.state.searchText}</span>
        </form>
        {this.state.list.map(el => {
          return (
          <div key={el.objectID}>
            <span>{el.name}</span>
            <span>{el.author}</span>
            <span>{el.rate}</span>
            <span>{el.objectID}</span>
            <span>
              <button 
                onClick= { () => this.onDismiss(el.objectID)}
                type="button">
              Click ME!
              </button>
            </span>
          </div>
          )
        })}
      </div>
    );
  }

}

export default App;
