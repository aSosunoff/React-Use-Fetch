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

### Example

```js
import { useFetch } from "@asosunoff/react_use_fetch";

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
