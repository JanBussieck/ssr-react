import { StaticRouter } from 'react-router';
import Products from "./components/Products";

export default (props, serverContext) => {
  const store = configureStore(props);
  const { location } = serverContext;
  const context = {};
  return (
      <StaticRouter location={location} context={context}>
        <Route path="/products/:category">
          <Products />
        </Route>
      </StaticRouter>
  );
};
