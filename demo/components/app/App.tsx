import React, { useCallback, useMemo, useState } from "react";
import { useFetch } from "../../../src";
/* import { useFetch } from "../../../dist"; */
import ErrorImg from "../error-img";
import Spinner from "../spinner";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [{ status, data }, doFetch] = useFetch<IPost[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const doFetchWrapper = useCallback(() => {
    setClear(false);
    doFetch();
  }, [doFetch]);

  const [isClear, setClear] = useState(false);
  const clearHandler = useCallback(() => setClear(true), []);

  const list = useMemo(() => (isClear ? [] : data), [data, isClear]);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="offset-md-4 col-4 d-flex justify-content-center">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-primary"
              onClick={doFetchWrapper}
              disabled={status === "request"}
            >
              Fetch
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={clearHandler}
              disabled={status === "request"}
            >
              Clear
            </button>
          </div>
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
              {list?.map(({ userId, id, title, body }) => (
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
