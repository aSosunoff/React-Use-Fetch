import React, { useCallback, useEffect, useMemo, useState } from "react";
/* import { useFetchByCallback } from "../../../src"; */
import { useFetchByCallback } from "../../../dist";
import ErrorImg from "../error-img";
import Spinner from "../spinner";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [{ status, data, error }, doFetch] = useFetchByCallback<IPost[]>(
    async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        const body = await response.json();
        throw body;
      }

      const data = await response.json();

      return data;
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const [isClear, setClear] = useState(false);
  const clearHandler = useCallback(() => setClear(true), []);

  const doFetchWrapper = useCallback(() => {
    setClear(false);
    doFetch();
  }, [doFetch]);

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
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Post ID</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
              </tr>
            </thead>
            {status === "success" && (
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
            )}
          </table>

          {status === "request" && <Spinner />}

          {status === "failure" && <ErrorImg />}
        </div>
      </div>
    </div>
  );
};

export default App;
