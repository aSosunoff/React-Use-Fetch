import React from "react";
import { useFetch } from "../../hooks/use-fetch";
import ErrorImg from "../error-img";
import Spinner from "../spinner";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  //
  const [{ status, data, error }, doFetch] = useFetch<IPost[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-4">
          <button type="button" className="btn btn-primary" onClick={doFetch}>
            Fetch
          </button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Post ID</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
              </tr>
            </thead>
            <tbody>
              {data?.map(({ userId, id, title, body }) => (
                <tr key={id}>
                  <th scope="row">{userId}</th>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {status === "request" ? <Spinner /> : null}
          {status === "failure" ? <ErrorImg /> : null}
        </div>
      </div>
    </div>
  );
};

export default App;
