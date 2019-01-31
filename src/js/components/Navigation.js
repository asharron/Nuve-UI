import React, { Component } from "react";

import { MdSearch, MdSettings, MdHome, MdArrowBack } from "react-icons/md";
import { goTo, goBack } from "../Helpers";
import { ROUTES } from "../Routes";
import { store } from "../store";
import { connect } from "react-redux";

@connect(store => {
  return {
    shelves: store.library.shelves,
    selected: store.library.selected,
    showSearchbar: store.library.showSearchbar
  };
})
export default class Navigation extends Component {
  state = {
    selected: "movies"
  };

  switchShelf(shelf) {
    this.setState({
      selected: shelf
    });
    const payload = {
      shelf: shelf
    };
    store.dispatch({ type: "SWITCH_SHELF", payload });
  }

  goHome() {
    goTo(ROUTES.library.url);
  }

  toggleSearch() {
    store.dispatch({ type: "TOGGLE_SEARCH" });
  }

  render() {
    const ref = this;
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-faded navbar-fixed-top">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#nav-content"
            aria-controls="nav-content"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <ul className="nav navbar-nav w-25">
            <li className="nav-item icon">
              <a className="nav-link" onClick={this.goHome}>
                <MdHome />
              </a>
            </li>
            <li className="nav-item icon">
              <a className="nav-link" onClick={goBack}>
                <MdArrowBack />
              </a>
            </li>
          </ul>
          <div className="navbar-nav w-50 justify-content-center">
            <ul className="navbar-nav">
              {Object.keys(this.props.shelves).map((shelf, index) => {
                let active;
                if (shelf === this.state.selected) {
                  active = "active";
                }
                return (
                  <li className={"nav-item " + active} key={index}>
                    <a
                      className="nav-link"
                      onClick={() => ref.switchShelf(shelf)}
                    >
                      {shelf}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end w-25 ml-auto"
            id="nav-content"
          >
            <ul className="navbar-nav" style={{ float: "right" }}>
              <li className="nav-item icon">
                <a className="nav-link" onClick={this.toggleSearch}>
                  <MdSearch />
                </a>
              </li>
              <li className="nav-item icon">
                <a className="nav-link">
                  <MdSettings />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}