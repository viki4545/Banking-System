import "./App.css";
import { Routes, Route } from "react-router-dom";
import BankerLogin from "./Pages/bankersLogin";
import CustomerLogin from "./Pages/customerLogin";
import TransactionPage from "./Pages/transactionPage";
import AccountsPage from "./Pages/accountsPage";
import CustomerSignup from "./Pages/customerSignup";
import BankerSignup from "./Pages/bankerSignup";

function App() {
  return (
    <Routes>
      <Route path="/" Component={CustomerLogin} />
      <Route path="/bankerLogin" Component={BankerLogin} />
      <Route
        path="/transactionPage/:email/:usertype"
        Component={TransactionPage}
      />
      <Route path="/accountsPage" Component={AccountsPage} />
      <Route path="/customerSignup" Component={CustomerSignup} />
      <Route path="/bankerSignup" Component={BankerSignup} />
    </Routes>
  );
}

export default App;
