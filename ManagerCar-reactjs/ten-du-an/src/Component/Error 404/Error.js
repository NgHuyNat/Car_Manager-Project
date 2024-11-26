import "./Error.css";
import { Link } from "react-router-dom";
function Error() {
  return (
    <>
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Oops! Page not found.</p>
        <Link to="/" className="not-found__link">
          Back to Home
        </Link>
      </div>
    </>
  );
}
export default Error;
