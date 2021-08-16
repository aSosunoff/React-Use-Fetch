# React-Use-Form component React

![Table](./usefetch.gif)

## Demo:

[https://asosunoff.github.io/React-Use-Fetch/](https://asosunoff.github.io/React-Use-Fetch/)

### Install component

[npm i @asosunoff/react_use_fetch](https://www.npmjs.com/package/@asosunoff/react_use_fetch)

### Launch project:

```
git clone https://github.com/aSosunoff/React-Use-Fetch.git
cd React-Use-Fetch
npm i
npm run demo
```

### Test project:

```
npm test
```

## Example 1

```js
import { useFetchByUrl } from "@asosunoff/react_use_fetch";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [{ status, data }, doFetch] = useFetchByUrl<IPost[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div>
      <button
        type="button"
        onClick={doFetch}
        disabled={status === "request"}
      >
        Fetch
      </button>

      <table>
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
    </div>
  );
};

export default App;
```

## Example 2

```js
import { useFetchByCallback } from "@asosunoff/react_use_fetch";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [{ status, data }, doFetch] = useFetchByCallback<IPost[]>(
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

  return (
    <div>
      <button
        type="button"
        onClick={doFetch}
        disabled={status === "request"}
      >
        Fetch
      </button>

      <table>
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
    </div>
  );
};

export default App;
```
