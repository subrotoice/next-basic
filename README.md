## Ch-1: Next JS Basic

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
- Only page.tsx is accessable so you can not keep all coding in page. You can create other component and import that in page.tsx

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

## Ch-2: Styling Next.js Applications

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

```css
// global.css (in tailwind all element have no style. so change base directive and use apply directive)
@layer base {
  h1 {
    @apply font-extrabold text-2xl mb-3;
  }
}
```

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

## Ch-3: Routing & Navigation

1. Dynamic routes
2. Access route and Query String parameters
3. Create layouts
4. Show loading UIs
5. Handel errors

### Special files (Publicly accessable)

1. page.tsx
2. layout.tsx
3. loading.tsx
4. route.tsx
5. not-found.tsx
6. error.tsx<br>
   We can not access other file in a folder. domain.com/users/userTable.tsx but we can import that component in page.tsx <br>In future if we need Usertable.tsx then we could transfer general components folder

```jsx
// users/page.tsx
import React from "react";
import UserTable from "./new/UserTable";

const UserPage = () => {
  return (
    <>
      <h1>Users</h1>
      <UserTable />
    </>
  );
};

// UserTable.tsx
import React from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();
  return (
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
  );
};
```

### - Dynamic routes (users/[id]/page.tsx)

- Create folder in [], [id], [photoId] with in one folder you can not create same name folder

```jsx
// users/[id]/page.tsx
import React from "react";
interface Props {
  params: { id: number };
}

const UserDetailsPage = ({ params: { id } }: Props) => {
  return <div>UserDetailsPage {id}</div>;
};

// users/[id]/photos/[photoId]/page.tsx
import React from "react";

interface Props {
  params: { id: number, photoId: number };
}

const UserPhoto = ({ params: { id, photoId } }: Props) => {
  return (
    <div>
      UserPhoto {id} Photo:
      {photoId}
    </div>
  );
};
```

### - Catch all segment (/products/grocery/dairy/milk)

- products/[...slug] -> not assessable if not slug prouvided in url like domain.com/products
- products/[[...slug]] -> then it will acessable domain.com/products (no slug here)

```jsx
import React from "react";

interface Props {
  params: { slug: string[] };
}

const ProductPage = ({ params: { slug } }: Props) => {
  return (
    <div>
      ProductPage{" "}
      {slug.map((s, i) => (
        <span key={i}>{s}/</span>
      ))}
    </div>
  );
};
```

### - Accesing query string parameters (?sortOrder=price)

http://localhost:3000/products/grocery/dairy?sortOrder=name

```jsx
import React from "react";

interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      ProductPage {slug} {sortOrder}
    </div>
  );
};
```

**Sort users using fast sort**
https://www.npmjs.com/package/fast-sort

```jsx
// user/page.tsx
import React from "react";
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}

const UserPage = ({ searchParams: { sortOrder } }: Props) => {
  // console.log(sortOrder);
  return (
    <>
      <h1>Users</h1>
      {sortOrder}
      <UserTable sortOrder={sortOrder} />
    </>
  );
};

// UserTable.tsx
import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  const sortedUser = sort(users).asc(
    sortOrder === "name" ? (user) => user.name : (user) => user.email
  );
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name"> Name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email"> Email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUser.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

### - Layouts ( layout.tsx | Share UI among multiple pages )

- Every folder follow its own layout.tsx file inside. If not exist then it follow app/layout.tsx. But if anything put app/layout then it show all pages of all folders. ie. <Navbar />
- If you use 'RootLayout' inside a folder like app/layout.tsx then It show its own

```jsx
// app/layout.tsx (If show anything then it show all pages)
interface Props {
  children: React.ReactNode,
}

export default function RootLayout({children}: Props) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <NavBar />
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}

// app/admin/page.tsx
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-slate-200 p-5 mr-5">Admin Sidebar</aside>
      <div>{children}</div>
    </div>
  );
};

// app/admin/layout.tsx (export default function RootLayout() it make totally different root layout)
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <h1>WE are good 22</h1>
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}

```

### - Navigation - (< Link >)

- Only download content of the user page, Not any other files, font, css etc
- Pre-fetches links that are in the viewport
- Caches payload of pages on the client cache. It exist for one session and clear when a full page reload.
  **Build app and test**

```bash
npm run build
npm start // Start builded project from dist folder
```

### - Programmatic navigation (Wihtout Link tag like button click we have to pass link to go other pages)

- import { useRouter } from "next/navigation", const router = useRouter(), router.push("/users")

```jsx
// users/new/page.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NewUser = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        router.push("/users");
      }}
    >
      Create
    </button>
  );
};
```

### - Showing Loading Uis (loading.tsx)

- Using React Suspense. [React Suspense](https://prnt.sc/bpLDXyZZN-do)
- Using loading.tsx

```jsx
// React: Using Suspense,   // you can use any loading copmonent as fallback
<Suspense fallback={<p>Loading.....</p>}>
  <UserTable sortOrder={sortOrder} />
</Suspense>;

// Next: root loading.tsx (Show loading if transfer from one page to another)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <NavBar />
        <main className="p-5">
          <Suspense fallback={}>{children}</Suspense>
        </main>
      </body>
    </html>
  );
}

// loading.tsx on root or any folder
// loading.tsx (use daisy ui)
const Loading = () => {
  return <span className="loading loading-spinner loading-sm"></span>;
};
```

### - Handiling Not Found Errors ( not-found.tsx )

- If create in root(app) folder then it works for all. But you can create inside a folder then it works for that folder

```jsx
// root(app)/not-found.txs
import React from "react";

const NotFoundPage = () => {
  return <div>The requested page doesn&apos;t exist.</div>;
};

// app/users/page.tsx (It through to app/users/not-found.tsx)
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: { id: number };
}
const UserDetailsPage = ({ params: { id } }: Props) => {
  if (id > 10) notFound();
  return <div>UserDetailsPage {id}</div>;
};

// app/users/not-found.tsx
import React from "react";

const NotFoundPage = () => {
  return <div>This user doesn&apos;t exist.</div>;
};
```

### - Handling Unexpected Errors ( error.tsx ) need use client

- app/error.tsx capture any error in any route(folder)
- To capture root layout.tsx error create global-error.tsx (client component)
- Next autometically pass error, reset() as Props

```jsx
// error.tsx (root)
"use client"; // For Retry button
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error: ", error);
  return (
    <>
      <div>An unexpected error has occurred.</div>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
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
