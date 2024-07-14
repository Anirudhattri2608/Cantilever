import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  state = {
    darkMode: false,
  };

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  render() {
    const { darkMode } = this.state;
    const appClass = darkMode ? "bg-dark text-light" : "bg-light text-dark";

    return (
      <Router>
        <div className={`app ${appClass}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={this.toggleDarkMode} />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  country="in"
                  category="general"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  country="in"
                  category="business"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  country="in"
                  category="entertainment"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  country="in"
                  category="general"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  country="in"
                  category="health"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  country="in"
                  category="science"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  country="in"
                  category="sports"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  country="in"
                  category="technology"
                  pageSize={8}
                  darkMode={darkMode}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
