import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/Sidebar/Sidebar";
import Company from "./components/Company/Company";
import Service from "./components/Service/Service";
import Employee from "./components/Employee/Employee";
import Staff from "./components/Staff/Staff";
import CompanyService from "./components/CompanyService/CompanyService";
import Bill from "./components/Bill/Bill";
import Salary from "./components/Salary/Salary";
import { PATH } from "./constants/path";
import "./App.scss";
import salary from "./components/Salary/Salary";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <SideBar />
        <Route path={PATH.COMPANY} exact component={Company} />
        <Route path={PATH.SERVICE} exact component={Service} />
        {/* <Route path={PATH.STAFF_BUILDING} exact component={Staff} /> */}
        <Route path="/company/:id/employee" exact component={Employee} />
        <Route path={PATH.STAFF_BUILDING} exact component={Staff} />
        <Route path="/company/:id/service" exact component={CompanyService} />
        <Route path={PATH.BILL} exact component={Bill} />
        <Route path={PATH.SALARY} exact component={Salary} />
      </div>
    </BrowserRouter>
  );
};

export default App;
