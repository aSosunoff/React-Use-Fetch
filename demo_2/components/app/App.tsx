import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFetch } from "../../../src";
import { useLocalStorage } from "../../hooks/useLocalStorage";
/* import { useFetch } from "../../../dist"; */
/* import ErrorImg from "../error-img"; */
import Spinner from "../spinner";

interface IUser {
  user: {
    bio: any;
    createdAt: string;
    email: string;
    id: number;
    image: any;
    token: string;
    updatedAt: string;
    username: string;
  };
}

interface IUserError {
  errors: {
    [key: string]: string[];
  };
}

interface IArticles {
  articles: {
    author: {
      bio: any;
      following: boolean;
      image: string;
      username: string;
    };
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: any[];
    title: string;
    updatedAt: string;
  }[];
  articlesCount: number;
  errors: {
    [key: string]: [];
  };
}

const App: React.FC = () => {
  /* LOGIN */

  const [token, setToken] = useLocalStorage<string>("token");

  const [{ status, data, error }, doFetch] = useFetch<IUser, IUserError>(
    "https://conduit.productionready.io/api/users/login"
  );

  const errors = useMemo(() => {
    if (status === "failure" && error) {
      return Object.entries(error.errors).reduce<string[]>(
        (res, [key, value]) => {
          res.push(`${key}: ${value.join(", ")}`);
          return res;
        },
        []
      );
    }
    return [];
  }, [error, status]);

  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "12weqweweeqwe3@mail.ru",
    password: "qweqweqweqwqwe",
  });

  useEffect(() => {
    if (data?.user) {
      setToken(data.user.token);
    }
  }, [data, setToken]);

  /* ARTICLES */

  const [{ status: statusArticles, data: dataArticles }, doFetchArticles] =
    useFetch<IArticles>(
      "https://conduit.productionready.io/api/articles?limit=10&offset=0"
    );

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6 offset-3">
          <label htmlFor="login" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            id="login"
            value={user.email}
            onChange={({ target }) => {
              console.log(target.value);

              setUser((user) => ({ ...user, login: target.value }));
            }}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-6 offset-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={user.password}
            onChange={({ target }) => {
              setUser((user) => ({ ...user, password: target.value }));
            }}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="offset-md-4 col-4 d-flex justify-content-center">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                doFetch({
                  method: "POST",
                  body: JSON.stringify({ user }),
                  headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                  },
                });
              }}
              disabled={status === "request"}
            >
              Login
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                doFetchArticles({
                  method: "GET",
                  /* headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: token ? `Token ${token}` : "",
                  }, */
                });
              }}
              disabled={statusArticles === "request"}
            >
              Fetch Articles
            </button>
          </div>
        </div>
      </div>

      {errors.map((error, index) => (
        <div key={index} className="alert alert-danger" role="alert">
          {error}
        </div>
      ))}

      <div className="row mt-3">
        <div className="col">
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
              </tr>
            </thead>
            <tbody>
              {dataArticles?.articles.map(({ title, body }, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {statusArticles === "request" ? <Spinner /> : null}
        </div>
      </div>
    </div>
  );
};

export default App;
