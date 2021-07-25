import ListForm from "./Components/listForm"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from "./Components/layout";
function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Route path="/" exact component={ListForm} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
