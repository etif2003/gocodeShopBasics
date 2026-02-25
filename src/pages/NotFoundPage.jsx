import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>העמוד שחיפשת לא קיים</h2>
      <Link to="/">
        <button className="not-found-page-btn">חזרה למסך הבית</button>
      </Link>
    </div>
  );
}