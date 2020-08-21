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

        <form>
          <input type="text"
                  onChange={this.onChangeText} />
          <span>{searchText}</span>
        </form>

        {list.filter(isSearched(searchText)).map(el => {
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

export default App;
