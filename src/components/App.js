import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  // sync order to firebase db
  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  // clean up to avoid memory leaks
  componentWillUnmount() {
    base.removeBindingP(this.ref);
  }
  addFish = fish => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. add our new fish to that variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes object to state
    this.setState({
      fishes: fishes // fishes the state is set to fishes the variable
    });
  };

  updateFish = (key, updatedFish) => {
    // take a copy of state
    const fishes = { ...this.state.fishes };
    // update that copy of state
    fishes[key] = updatedFish;
    // set state
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = key => {
    // take copy of state
    const fishes = { ...this.state.fishes };
    // update that copy of state (remove fish)
    // firebase requires set to null
    fishes[key] = null;
    // set state
    this.setState({
      fishes: fishes
    });
  };

  removeFromOrder = key => {
    // take copy of state
    const order = { ...this.state.order };
    // update that copy of state (remove fish)
    delete order[key];
    // set state
    this.setState({
      order: order
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
