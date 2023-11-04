import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Route, Routes, Navigate, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AUTH_CHECK, AUTH_ERROR } from "@/store/RootReducer";
import { RootState } from "./store/type/RootState";
import { API, SetAuthToken } from "./config/api";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Main from "./layout/AppLayout";
import ThreadDetail from "./features/threads/components/ThreadDetail";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "darkBackground",
      },
    },
  },
  colors: {
    darkBackground: "#222",
  },
});

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  console.log(auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function authCheck
  async function authCheck() {
    try {
      SetAuthToken(localStorage.token);
      const response = await API.get("/check");
      console.log("check auth app", response);

      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      console.log("auth check error", err);
      setIsLoading(false);
      navigate("/login");
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Private Root
  function IsNotLogin() {
    if (!localStorage.token) {
      return <Navigate to="/login" />;
    } else {
      return <Main />;
    }
  }

  function IsLogin() {
    if (localStorage.token) {
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <ChakraProvider theme={theme}>
          <Routes>
            <Route element={<IsNotLogin />}>
              <Route path="/" element={<Home />} />
              <Route path="/thread/:id" element={<ThreadDetail />} />
            </Route>

            <Route path="/" element={<IsLogin />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </ChakraProvider>
      )}
    </>
  );
}
export default App;
