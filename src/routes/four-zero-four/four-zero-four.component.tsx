import { Link } from "react-router-dom";

function FourZeroFourComponent() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/"> Go back to Home page</Link>
    </div>
  );
}
export default FourZeroFourComponent;
