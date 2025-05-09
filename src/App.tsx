import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Sample from "./screens/auth/Sample";
import SignIn from "./screens/auth/SignIn";
import { store } from "./config/createStore";
import SignUpContainer from "./screens/auth/SignUpContainer";
import { rootNames } from "./common/constants";
import ResetPasswordContainer from "./screens/auth/ResetPasswordContainer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path={rootNames.SING_IN} element={<SignIn />}></Route>

          <Route path={rootNames.SING_UP} element={<SignUpContainer />}></Route>
          <Route path={rootNames.RESET_PASSWORD} element={<ResetPasswordContainer />}></Route>
          {/* <Route path="/Sample" element={<Sample />}></Route> */}
          {/* <Route element={<PrivateRoute />}> 
          <Route path="/app" element={<Homepage />}>
            <Route path="DashBoard" index element={<DashBoard />}></Route>
            <Route path="Chats" element={<Chats />}></Route>
            <Route path="Chats/:id" element={<Chat />}></Route>
            <Route path="FCSlots" element={<FCSlots />}></Route>
            <Route path="MyReferrals" element={<Refferals />}></Route>
            <Route path="Settings" element={<Settings />}></Route>
            <Route path="Support" element={<Support />}></Route>
            <Route path="TopUp" element={<TopUp />}></Route>
            <Route path="Wallet" element={<Wallet />}></Route>
            <Route path="Withdraw" element={<Withdraw />}></Route>
            <Route path="Navbar" element={<NavBar />}></Route>
          </Route>*/}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
