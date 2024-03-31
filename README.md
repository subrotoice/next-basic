## Next JS Basic

### Installation

```bash
npx create-next-app
```

- Routing: folderName/page.tsx -> domain.com/folderName, folderName/folderInside/page.tsx ->domain.com/folderName/folderInside

- A/Link tag: [A](https://prnt.sc/cH21_fHoqS5q) [Link](https://prnt.sc/jmR5Epp64fe9)

### Client and Server component

- Client component some issues: Large bundles, No SEO, Less Secure, Extra roundtrip to server
- Use as much as server component (default), If you need to handel click or like this event then only that part make client,
- Suppose Product Cart whole component need to make 'use client' we just make AddToCart as client component.

```jsx
// ProductCard.tsx
import AddtoCart from "./AddtoCart";

const ProductCard = () => {
  return (
    <div>
      Product Card
      <AddtoCart /> // Client component; Make a slote where react will later inject
      our client component
    </div>
  );
};

// AddtoCart.tsx
("use client");
import React from "react";

const AddtoCart = () => {
  return (
    <div>
      <button onClick={() => console.log("Click")}>Add to Cart</button>
    </div>
  );
};
```

### - Data Fetching

- Data fetching using client component always we need to extra roundtrip to server (Load bandel then fetch data)
- Load data when page is render [Click here](https://prnt.sc/ozaVS5wJUr_O)

```jsx
import React from "react";

interface User {
  id: number;
  name: string;
}
const UserPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.id + user.name}</li>
        ))}
      </ul>
    </>
  );
};
```

### - Caching

- Next has built in data cache based on File System(Server er file e rakhe)
- Data could be fetch: Memory(Fast), File System, Network(Slow)
- Caching only done with fetch(), not axios

```jsx
// Cache is default: But we can control
// No Cache
const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  cache: "no-store",
});
// Fetch fresh data every 10 sec
const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  next: { revalidate: 10 },
});
```

### - Static Rendering (Static site generation): Render at build time

- 'npm run build' to build the project and 'npm start' open that builded project
- [Static and Dynamic Defination](https://prnt.sc/rvJMHL1Zq9XT)
- [Static and Dynamic](https://prnt.sc/Ach5QLHAr_uE)

```jsx
// user if cache on then new Date().toLocaleTimeString() give same time stamp so make this file at build time. When cache is 'no-store' then change over time so it is Static server component
import React from "react";
interface User {
  id: number;
  name: string;
}
const UserPage = async () => {
  // Static
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.id + user.name}</li>
        ))}
      </ul>
    </>
  );
};

// It will become dynamic component
const res = await fetch("https://jsonplaceholder.typicode.com/users", {
  cache: "no-store",
});
```

## Styling Next.js Applications

1. Global styles (app/globals.css)
2. CSS modules
3. Tailwind CSS
4. Daisy UI (Bootstrap of Tailwind)

### - Global styles

- Styles to apply to all pages. h1, p,
- Can not use .user-list

### - CSS Modules

- As React
- CSS modules you can not use game-card need to use gameCard because it is not valid identifier

### - Tailwind CSS

- Class that are used will be included in bundel
- Job Scope huge

### - Daisy UI

```bash
npm i -D daisyui@latest
```

Then add daisyUI to your tailwind.config.js files:

```jsx
module.exports = {
  //...
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"], // if you want to use theme
  },
};

// layout.tsx
<html lang="en" data-theme="winter"> // winter theme used

// AddtoCart.tsx
<button className="btn btn-primary">Primary</button>

// users/page.tabs-tsx
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <>
      <h1>Users</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```

### -

```jsx

```
