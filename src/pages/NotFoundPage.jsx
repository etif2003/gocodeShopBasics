import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>The page you were looking for does not exist</h2>
      <Link to="/">
        <button className="not-found-page-btn">Back to Home Page</button>
      </Link>
    </div>
  );
}
