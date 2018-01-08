import React, { Component } from "react";
import SelectedFoods from "./SelectedFoods";
import FoodSearch from "./FoodSearch";

class App extends Component {
  state = {
    selectedFoods: []
  };

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

    return (
      <div className="wrapper"><br></br>
        <h2 className="ui center aligned blue header">
          <img className="ui large image" src="./abacus.png" alt="Logo placement"></img>
          <div className="content">NutriCalc
            </div>
        </h2>

      <div className="App">
        <div className="ui text container">
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch onFoodClick={this.addFood} />
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui center aligned secondary segment">2018 | Jeremy Avenarius

        </div>
        </div>
      </div>
    );
  }
}

export default App;
