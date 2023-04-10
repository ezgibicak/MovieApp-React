import { Link } from "react-router-dom";

export default function IndexMovie() {
  return (
    <>
      <h4>Movie</h4>
      <Link className="btn btn-primary" to ="/movie/create">Create Movie</Link>
    </>
  );
}
