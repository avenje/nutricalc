import React, { Component } from "react";
import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";
import Logo from "./logo-blue.png";
import TwitterLogin from 'react-twitter-auth';

class App extends Component {

  constructor() {
    super();
    this.state = {
      selectedFoods: []
      }
    // this.state = { isAuthenticated: false, user: null, token: '' };
  };

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  // ========================================

  removeFoodItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = food => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  };

  render() {
    const { selectedFoods } = this.state;
    let pageContent = !!this.state.isAuthenticated ?
    (
      <div>
        <p>Welcome!</p>
        <div>
          { "You are logged in as " + this.state.user.email }
        </div>
        <div>
          <button onClick={this.logout} className="blue tiny ui button" >
            Log out
          </button>
        </div>
      </div>
    ) :
    (
      <TwitterLogin loginUrl="http://localhost:3000/api/v1/auth/twitter"
                    onFailure={this.onFailed} onSuccess={this.onSuccess}
                    requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse"/>
    );
    

    return (
      <div className="wrapper"><br></br>

        <h2 className="ui center aligned violet header">
          <img className="ui small image" src={ Logo } alt="Logo placement"/>
          <div className="content" id="logoName">NutriCalc</div>         
        </h2>

        <div className="App">
          
          <div className="ui text container">
          { pageContent }
            <SelectedFoods
              foods={selectedFoods}
              onFoodClick={this.removeFoodItem}
            />
            <FoodSearch onFoodClick={this.addFood} />
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui center aligned secondary segment">2018 | Jeremy Avenarius</div>
          
        </div>
      </div>
    );
  }
}

export default App;
