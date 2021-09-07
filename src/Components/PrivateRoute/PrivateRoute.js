import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { userContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
    const [logedInUser, setLogedInUser] = useContext(userContext)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          logedInUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;