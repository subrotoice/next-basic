# Next.js Chapters

[Ch-1: Next JS Basic](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-1-next-js-basic)<br>
[Ch-2: Styling Next.js Applications](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-2-styling-nextjs-applications)<br>
[Ch-3: Routing & Navigation](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-3-routing--navigation)<br>
[Ch-4: Building API's](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-4-building-apis-create-api-endpoint-and-validate-with-zod-introduction-to-full-stack)<br>
[Ch-5: Database Integration ( Prisma )](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-5-database-integration--prisma-)<br>
[Ch-6: Uploading Files](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-6-uploading-files)<br>
[Ch-7: Authentication](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-7-authentication)<br>
[Ch-8: Sending Emails](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-8-sending-emails)<br>
[Ch-9: Optimization](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-9-optimization)<br>
[Ch-10: Deployment: Fix build errors](https://github.com/subrotoice/next-basic?tab=readme-ov-file#ch-10-deployment:-Fix-build-errors)<br>

## Ch-1: Next JS Basic

### Installation

```bash
npx create-next-app
```

- Routing: folderName/page.tsx -> domain.com/folderName, folderName/folderInside/page.tsx ->domain.com/folderName/folderInside

- A/Link tag: [A](https://prnt.sc/cH21_fHoqS5q) [Link](https://prnt.sc/jmR5Epp64fe9)

### Client and Server component

- Issues client component: Large bundles, No SEO, Less Secure, Extra roundtrip to server to fetch data
- Use as much as server component (default), If you need to handel click or like this event then only that part will be 'use client',
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

- Next has built in data cache based on File System(keep file in the server)
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
// Static: user if cache on then new Date().toLocaleTimeString() give same time stamp so make this file at build time. When cache is 'no-store' then change over time so it is Static server component
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

// Dynamic: It will become dynamic component
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

- Styles to apply to all pages. h1, p

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

// users/page.tsx
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
- Catch as an array.

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
// users/page.tsx
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
- Caches payload of pages on the client cache. It exist for one session and clear when a full page reload.<br>
  **Build app and test**

```bash
npm run build
npm start // Start builded project from dist folder
```

### - Programmatic navigation (Wihtout Link tag like button click we have to pass link to go other pages)

1. import { useRouter } from "next/navigation";
2. const router = useRouter();
3. router.push("/users")

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

### - Showing Loading UI's (loading.tsx)

- Using React Suspense. [React Suspense](https://prnt.sc/bpLDXyZZN-do)
- Using loading.tsx

```jsx
// React: Using Suspense,   // you can use any loading copmonent as fallback
<Suspense fallback={<p>Loading.....</p>}>
  <UserTable sortOrder={sortOrder} />
</Suspense>;

// Next: app/loading.tsx (Show loading if transfer from one page to another)

// loading.tsx on root or any folder
// loading.tsx (use daisy ui)
import React from "react";

const Loading = () => {
  return <span className="loading loading-spinner loading-sm"></span>;
};

export default Loading;
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

## Ch-4: Building API's (Create API endpoint and Validate request body wich Zod) <br>Introduction to full stack

### - Getting a collection of Objects

- Create folder api/users. api is not necessary but well followed convention
- Create route.tsx in this folder. In a folder we can create either route.tsx or page.tsx but not both.
- To show someting as markup we use page.tsx, to handel http request we should use route.tsx
- In route.tsx we can use one or more route handeler. Is a function that handel a http request. ie. GET, POST, PUT, DELETE
- [Xod Example](https://chat.openai.com/share/bd11ca30-59ef-439c-896d-3fa412eeb770)

```jsx
// GET - NextRequest, NextResponse is two key
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Mosh" },
    { id: 2, name: "Subroto" },
  ]);
}
```

```jsx
// http://localhost:3000/api/users
// app/api/user/route.tsx
// GET Route handeler
import { NextRequest, NextResponse } from "next/server";

// GET - all user
export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Mosh" },
    { id: 2, name: "Subroto" },
  ]);
}

// POST - Create user
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate
  if (!body.name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}

// http://localhost:3000/api/users/1
// app/api/user/[id]/route.tsx single user (Receving id is same as page.tsx)
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: number };
}

// GET/id:1
export function GET(request: NextRequest, { params: { id } }: Props) {
  if (id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: "Mosh" });
}

// PUT
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  // S1: Validate the request body,  If invalide, return 400
  if (!body.name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  // S2: Fetch the user with the given id,  If doesn't exist, return 404
  if (id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // S3: Update the user,  Return the updated user

  return NextResponse.json({ id: id, name: body.name });
}

// Delete
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  if (id > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({});
}
```

### - Validating Requests with Zod (api/users/schema.ts)

```bash
npm i zod
```

```jsx
// schema.ts
import { z } from "zod";
// z.object({
//   name: z.string().min(3),
//   email: z.string().email(),
//   age: z.number(),
// });
const schema = z.object({
  name: z.string().min(3),
});

// users/route.tsx
// POST - Create user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body); // zod validation
  // Validate
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}

// users/[id]/route.tsx
// PUT
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body); // zod validation
  // Validation using Zod
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json({ id: id, name: body.name });
}
```

### - Building Products API (app/api/products)

```jsx
// schema.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  price: z.number().min(1).max(100),
});

// products/route.ts
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

// GET - Getting all Product
export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Milk", price: 2.5 },
    { id: 2, name: "Bread", price: 3.5 },
  ]);
}

// POST - Create Product
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  return NextResponse.json({ id: 1, ...body });
}

// products/[id]/route.tsx
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

// GET - id
export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10) return NextResponse.json({ error: "User not found" });
  return NextResponse.json({ id: 1, name: "Milk", price: 5.5 });
}

// PUT - id
export function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, ...body });
}

// DELETE - id
export function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({});
}
```

## Ch-5: Database Integration ( Prisma )

- ORM is a tool that sit between our Application and Database

### - Setting up Prisma

```bash
npm i prisma
```

To get prisma command "npx"

```bash
npx prisma
```

Set up prisma. https://prnt.sc/r_gkmq2vlYmX

```bash
npx prisma init
```

.env file [Connection String Format](https://prnt.sc/Z1H-zDfYb5b1) For MySql Database

```jsx
DATABASE_URL = "mysql://root:@localhost:3306/nextjs";
```

Add .env to .gitignore

```
# local env files
.env
```

Now in prisma/schema.prisma (datasource>provider to mysql)

```jsx
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Setup is done.<br >
Database opeartion:
Then create model

```jsx
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String
  followers    Int      @default(0)
  isActive     Boolean  @default(true)
  registeredAt DateTime @default(now())
}
```

Format schema & Run migration in command line. A database table will be created. To add another column add this column to user model and again run this two command or only 'npx prisma migrate dev'. 'npx prisma format' only for schema butifully formated

```bash
npx prisma format
npx prisma migrate dev
```

### - Creating Prisma Client (prisma/client.ts) - One time work

```jsx
// prisma/client.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
```

- More accurate and use global space. It is smart version of upper code. Use this one. [Next JS Prisma CLient](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)
- Don't worry about this code. Just copy and paste and you only need to do it once and never comeback again.

```jsx
// prisma/client.ts | Just copy and past (ignore upper and just use this piece of code for better performance)
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

### - Getting Data (route.tsx | Same code only fetch)

```jsx
// api/users/route.tsx
import prisma from "@/prisma/client";
// GET - all user
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

// api/users/[id]/route.tsx ( Here url id always sting. Then use parseInt(id))
import prisma from "@/prisma/client";

interface Props {
  params: { id: string }; // here url id always sting. Then use parseInt(id)
}

// GET - ID
export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}
```

### - Creating data (users/route.tsx)

```jsx
// users/route.tsx
import prisma from "@/prisma/client";

// POST - Create user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  // Validate
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    // Check email is exist or not
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );

  // const user = await prisma.user.create({ // This also work but have security risk
  //   data: body,
  // });

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
```

### - Updating Data

```jsx
// PUT - ID & {body}
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  // S1: Validate the request body,  If invalide, return 400
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  // S2: Fetch the user with the given id,  If doesn't exist, return 404
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id }, // user object fetch using prisma
    data: {
      name: body.name,
      email: body.email,
    },
  });

  // S3: Update the user,  Return the updated user
  return NextResponse.json(updatedUser);
}
```

### - Deleting Data

```jsx
// DELETE - Id
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json({});
}
```

### Product API Practice

**Database operation for new model**<br>
Step1: Create model

```jsx
model User {
  id Int @id @default(autoincrement())
  email String @unique
  name String
  followers Int @default(0)
  isActive Boolean @default(true)
  registeredAt DateTime @default(now())
}
```

Step2: Create zod based validation Schema

```jsx
// products/schema.ts
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  price: z.number().min(1).max(100),
});

export default schema;
```

Step3: Run in Terminal

```bash
npx prisma format
npx prisma migrate dev
```

NB: const body = await request.json() | Must use await here <br >
Step4: Run db opration

```jsx
// Read All Record
const products = await prisma.product.findMany();

// Read One Row
const product = await prisma.product.findUnique({
  where: { id: parseInt(params.id) },
});

// Create record
const newProduct = await prisma.product.create({
  data: {
    name: body.name,
    price: body.price,
  },
});

// Update
const updatedProduct = await prisma.product.update({
  where: { id: product.id },
  data: {
    name: body.name,
    price: body.price,
  },
});

// Delete
await prisma.product.delete({
  where: { id: parseInt(params.id) },
});
```

## Ch-6: Uploading Files

**To store files that user upload we have to use:**<br>
**Cloude Platform: Amazon S3, Google Cloud, Microsoft Azure, Cloudinary**<br>
Step1: Create free account on cloudinary.com give you actual space to upload files<br>
Step2: [Installation & Use](https://next.cloudinary.dev/installation) provides Next Components and API for using cloudinary.com

```bash
npm install next-cloudinary
```

Step3: .env file - [Click](https://prnt.sc/OsdzukL0CawQ)

```jsx
// .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "dvkrnqxac"; // environment name from console.cloudinary.com, https://prnt.sc/OsdzukL0CawQ
```

Step4: From next.cloudinary.dev, use this two component < CldUploadWidget: to upload> < CldImage: to display > <br>
To get uploadPreset="ylz6b7tw", [Cloudinary](https://console.cloudinary.com/) > Setting > Upload(Click) > Upload presets (Scroll on right) https://prnt.sc/i3hKv9vv-lU- <br>
Go to 'Media Library' to see the uplaod media on Cloudinary.

```jsx
// app/upload/page.tsx
"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CoudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublictId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage src={publicId} width={270} height={180} alt="My Image" />
      )} // to Display Image
      <CldUploadWidget  // To Upload image
        uploadPreset="ylz6b7tw"
        options={{ // to customized uploading UI
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
          styles: {},
        }}
        onSuccess={(result, { widget }) => {
          console.log(result);
          if (result.event !== "success") return; // see how should be code
          const info = result.info as CoudinaryResult; // Create interface here because result.info is not properly typed
          setPublictId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload C
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};
```

NB: onUpload is depricated, onSuccess same as onUpload: truggered after upload
Step6: Customized upload widget [Click](https://demo.cloudinary.com/uw)

## Ch-7: Authentication

- Setting up Next Auth
- Google Provider
- Authentication Sessions
- Protecting routes
- Database adapters
- Configure Credintials Provider

### - Setting up Next Auth

```jsx
npm install next-auth
```

.env, openssl rand -base64 32

Can't Save it in README.md [Click](https://prnt.sc/6kfeQgWOf2GD)

### - Configuring Google Provider

```bash
npm install next-auth
```

Can't Save it in README.md [Click](https://prnt.sc/K6QP3iWCxHwN)

```jsx
// .env
https://prnt.sc/K6QP3iWCxHwN
// /app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };

// NavBar.tsx
<Link href="/api/auth/signin">Login</Link>
```

[console.developers.google](https://console.developers.google.com/apis/credentials)

The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;

For development: http://localhost:3000/api/auth/callback/google

### - Understanding Authentication Sessions

- You never need this step in real life porjects. To understand what is going on under the hood. https://prnt.sc/oXET8JairlZs

```jsx
// /app/auth/token/route.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  return NextResponse.json(token);
}
```

### - Acceessing Session on the Client ([React Context](https://www.w3schools.com/REACT/react_usecontext.asp) used). React Contex is Client Component

```jsx
// NavBar.tsx
"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/users" className="mr-5">
        Users
      </Link>
      {status === "authenticated" && <Link href="#">{session.user?.name}</Link>}
      {status === "unauthenticated" && <Link href="#">Login</Link>}
    </div>
  );
};

// app/layout.tsx
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

// /auth/Provider.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

NB: We normally do not need it. Its just an example how we access session on the client. We normally do it form server.

### - Accessing Session on the Server

- getServerSession(authOptions), auth option import from api/auth/[...nextauth]/route.ts

```jsx
// /app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions); // api/auth/[...nextauth]/route.ts

  return (
    <main>
      <h1>Hello {session && <>{session.user?.name}</>}</h1>
      <Link href="users">User</Link>
      <ProductCard />
    </main>
  );
}

// /api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

```

### - Sign Out User ( NavBar.tsx - href="/api/auth/signout" )

```jsx
// NavBar.tsx
{
  status === "authenticated" && (
    <>
      {session.user?.name}
      <Link href="/api/auth/signout" className="ml-3">
        Sing Out
      </Link>
    </>
  );
}
```

### - Protecting Routes (middleware.ts)

- Not in app directory. In root directory

```jsx
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import middleware from "next-auth/middleware";

// Middleware default
export default middleware;

// Using middleware function: Custom
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/new-page", request.url));
// }

export const config = {
  matcher: ["/users/:id*"], // Must start with /
};
```

### - Database Adapters: Store in DB

- When someone sing in with new google account then store user info in DB

```bash
npm i @next-auth/prisma-adapter
```

[Prisma Adapter](https://authjs.dev/reference/adapter/prisma) Copy DB Schema<br>
import { PrismaAdapter } from "@next-auth/prisma-adapter";<br>
adapter: PrismaAdapter(prisma), // Prisma Client <br>
session: {
strategy: "jwt",
},

```jsx
// /api/auth/[...nextauth]/route.ts
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

```

NB: If issue come with "Sing in with different account" > provider String @db.VarChar(100). VarCar Max Lenght 100

### - Configuring Credentials Providers [CredentialsProvider](https://next-auth.js.org/providers/credentials)

- To login with username and password

```bash
npm i bcrypt
```

To get types (AutoComplete)

```bash
npm i -D @types/bcrypt
```

```jsx
// schema.prisma ( hashedPassword String?    // Added)
model User {
  id             String    @id @default(cuid())
  name           String?
  email          String?   @unique
  hashedPassword String?    // Added
  emailVerified  DateTime?
  image          String?
  accounts       Account[]
  sessions       Session[]
}
```

- Add CredentialsProviders() function to providers: [] array

```jsx
CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "Email" },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
  },
  async authorize(credentials, req) {
    if (!credentials?.email || !credentials.password) return null;

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) return null;

    const passwordsMatch = await bcrypt.compare(
      credentials.password,
      user.hashedPassword!
    );

    return passwordsMatch ? user : null;
  },
}),
```

### - Registering Users ( /api/register/route.ts)

- HW Home Work: Here only backend work test with postman, Now you have to build a form provide client side validation and pass request with data from front end by react.

```jsx
// /api/register/route.ts
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user)
    return NextResponse.json({ Error: "User already exist." }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword, // Shortcut: hashedPassword: hashedPassword
    },
  });

  return NextResponse.json({ email: newUser.email });
}
```

## Ch-8: Sending Emails

- Setting Up React Email
- Creating an Email Template
- Previewing Emails
- Styling Emails
- Sending Emails

### - Setting Up React Email [react.email](https://react.email)

- Gives some component for creating HTML emails and Preview those emails

```bash
npm i react-email @react-email/components
```

package.json add: "preview-email": "email dev -p 3030"

```jsx
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "preview-email": "email dev -p 3030"
  },

```

### - Creating an Email Template (emails folder)

```jsx
// emails/WelcomeTemplate.tsx (it is not in app folder in root folder)
import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://www.google.com">www.google.com</Link>
        </Container>
      </Body>
    </Html>
  );
};
```

### - Previewing Emails

Add this line in .gitignore ('/' at the end)

```jsx
.react-email/
```

At this point, you can send email from localhost. [Click Here](https://prnt.sc/0hCBhg0MKfXl)

```bash
npm run preview-email
```

### - Styleing Emails

```jsx
// emails/WelcomeTemplate.tsx
// System 1: Inline CSS (Pass an object)
<Body style={{ background: "#101010" }}>
  <Container>
    <Text>Hello {name}</Text>
    <Link href="https://www.google.com">www.google.com</Link>
  </Container>
</Body>;

// System 2: Style object; Outside the markup, CSSProperties one for intellesense
const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body style={body}>
        <Container>
          <Text style={heading}>Hello {name}</Text>
          <Link href="https://www.google.com">www.google.com</Link>
        </Container>
      </Body>
    </Html>
  );
};

const body: CSSProperties = {
  // CSSProperties for auto complete only
  background: "#fff",
};

const heading: CSSProperties = {
  fontSize: "32px",
};

export default WelcomeTemplate;

// System 3: Tailwind (Import Tailwind) use any class of tailwind with className
import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Tailwind, // added
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold text-4xl text-red-400">
              Hello {name}
            </Text>
            <Link href="https://www.google.com">www.google.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
```

### - Sending Emails

```bash
npm install resend
```

[resend.com](https://resend.com/overview) <br >
.env file<br>
RESEND_API_KEY= and Paste it <br>
Here create an api through which we can send email
[API ENDPOINT](http://localhost:3000/api/send-email)

```jsx
// /app/api/send-email/route.ts (WelcomeTemplate as function and Props as object)
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeTemplate from "@/emails/WelcomeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: body.email, // in testing you can send own email
    subject: "Hello World 34" + body.name,
    react: WelcomeTemplate({ name: body.name }),
  });

  if (!data) return NextResponse.json({ error: "Error Sending email" });

  return NextResponse.json(data);
}
```

## Ch-9: Optimization

- Optimizing images
- Using third-party JS libraries
- Using custom fonts
- SEO
- Lazy loading

### - Optimizing images [Next Doc](https://nextjs.org/docs/pages/api-reference/components/image)

< Image Props >: A lot to know about nextjs Image tag. Very powerful

Props: Required: (src, width, height, alt), quality, loading = 'lazy' priority={false}

- loading = 'lazy', defer loading the image until it reaches a calculated distance from the viewport.
- priority={true}, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
- Fill: the parent element, which is useful when the width and height are unknown. Parent must assign position: "relative", position: "fixed", or position: "absolute" style.
- Width and Height are Required, except for statically imported images or images with the 'fill' property.
- Size: Similar to a media query, that provides information about how wide the image will be at different breakpoints. The value of sizes will greatly affect performance for images using fill or which are styled to have a responsive size. Reduce image resulation accoudingly. <br>
  sizes="5vw" ie. Media Resulation: 1000px, resize to 50px width and auto hight, Image will be 4/5kb. All this happend under the hood<br>
  sizes="(max-width: 480px) 100vw, (max-widht: 768px) 50vw, 33vw" // Load depending on the device. It use srcset<br>
- placeholder="blur": only for local images. make image blur before loading big images
- srcset: Load image depending on device. [Click](https://www.w3schools.com/tags/att_source_srcset.asp) Autometic in Nextjs

```jsx
// Local Images: in public folder
// /app/opt-images/page.tsx
import Image from "next/image";
import fieldImg from "@/public/field.jpg";

export default async function Home() {
  return (
    <main>
      <h1>Hello World From opt-img</h1>
      <Image src={fieldImg} width={500} height={500} alt="Field Image" />
    </main>
  );
}

// Remote Images: (Need to add hostname from where remote image will be load)
// next.config.js (https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

module.exports = nextConfig;

// /app/opt-images/page.tsx
<Image
  src="https://img.youtube.com/vi/27YP6n6pDh0/maxresdefault.jpg"
  alt="YouTube Thumb"
  fill
  className="object-cover"
  // Loaded image sizes (resulation), Here in desptop image that will be load 1/3 of Full Relulation, Because here we can show 3 images on a row
  sizes="(max-width: 480px) 100vw, (max-widht: 768px) 50vw, 33vw"
/>;
```

### - Using third-party JS libraries < Script src> ( "strategy" to when certain script will be load)

< Script src=" " strategy='afterInteractive(default)|beforeInteractive|lazyOnload|worker' /> <br>
4 Strategies: <br>

1. beforeInteractive: Load the script before any Next.js code and before any page hydration occurs.<br >
2. afterInteractive: (default) Load the script early but after some hydration on the page occurs.<br >
3. lazyOnload: Load the script later during browser idle time.<br >
4. worker: (experimental) Load the script in a web worker.

```jsx
// layout.tsx
import GoogleAnalyticsScript from "./GoogleAnalyticsScript";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" data-theme="winter">
      <GoogleAnalyticsScript />
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

// app/GoogleAnalyticsScript.tsx
import Script from "next/script";
import React from "react";

const GoogleAnalyticsScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E720JHXSJ2"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-E720JHXSJ1');`}
      </Script>
    </>
  );
};
```

### - Using Fonts

**Google font**

```jsx
// app/layout.tsx
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
});

return (
  <html lang="en" data-theme="winter">
    <GoogleAnalyticsScript />
    <body className={roboto.className}>
      <AuthProvider>
        <NavBar />
        <main className="p-5">{children}</main>
      </AuthProvider>
    </body>
  </html>
);
```

**Downloaded Font (Local Font)**

```jsx
// app/layout.tsx
import localFont from "next/font/local";

const pixelifySans = localFont({
  src: "../public/fonts/PixelifySans-Regular.ttf",
});

return (
  <html lang="en" data-theme="winter">
    <GoogleAnalyticsScript />
    <body className={pixelifySans.className}>
      <AuthProvider>
        <NavBar />
        <main>{children}</main>
      </AuthProvider>
    </body>
  </html>
);
```

**Custom variable fonts (First you have to keep it in parent tag ie. body then you can use it in child tag)**

```jsx
// app/layout.tsx
import { Inter, Roboto, Bungee } from "next/font/google";
import localFont from "next/font/local";

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bungee", // Can make any font variable
});

const pixelifySans = localFont({
  src: "../public/fonts/PixelifySans-Regular.ttf",
  variable: "--font-pixeliFy",
});

return (
  <html lang="en" data-theme="winter">
    <GoogleAnalyticsScript />
    <body className={`${pixelifySans.variable} ${bungee.variable}`}>
      <AuthProvider>
        <NavBar />
        <main>{children}</main>
      </AuthProvider>
    </body>
  </html>
);

// globals.css
.pixeify {
  font-family: var(--font-pixeliFy);
}

.bungee {
  font-family: var(--font-bungee);
}

// app/page.tsx
return (
  <main>
    <h1 className="pixeify">
      Hello pixeify {session && <>{session.user?.name}</>}
    </h1>
    <h1 className="bungee">bungee Font</h1>
    <Link href="users">User</Link>
    <ProductCard />
  </main>
);
```

**Register with tailwind CSS (need not to keep css code in globals.css, but both system is greate)**

```jsx
// app/layout.tsx
import { Inter, Roboto, Bungee, Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400"],
});

return (
  <html lang="en" data-theme="winter">
    <GoogleAnalyticsScript />
    <body
     // always libreBaskerville, pixeliFy, bungee when needed for a tag
      className={`${pixeliFy.variable} ${bungee.variable} ${libreBaskerville.className}`}
    >
      <AuthProvider>
        <NavBar />
        <main>{children}</main>
      </AuthProvider>
    </body>
  </html>
);

// taildind.config.ts (You will get in intellisense, Presh Ctrl+Space)
theme: {
  extend: {
    fontFamily: {
      bungee: ["var(--font-bungee)"],
      pixeify: ["var(--font-pixeliFy)"],
    },
    ....
  },
},

// app/page.tsx
return (
  <main>
    <h1 className="font-pixeify">
      Hello pixeify {session && <>{session.user?.name}</>}
    </h1>
    <h1 className="font-bungee">Hello bungee Font</h1>
    <Link href="users">User</Link>
    <ProductCard />
  </main>
);
```

### - SEO

```jsx
// app/layout.tsx
export const metadata: Metadata = {
  title: "Create Next App Subroto",
  description: "Generated by create next app 1",
};

// app/page.tsx (replace layout.tsx metadata title and description)
import { Metadata } from "next";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <main></main>;
}

// Replace layout.tsx
export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page Description",
};

// Dynamic metadata generate
export async function generateMetadata(): Promise<Metadata> {
  const product = await fetch(""); // fetch data from db or other api

  return {
    title: "Title generateMetadata",
    description: "Description generateMetadata",
  };
}
```

### - Lazy Loading

_1. Lazy Load Component_

```jsx
// lazy-load/page.tsx (HeavyComponent will not be load in bundel after click it will load)
// Dynamically load a component, Use only for large huge component
"use client";
import React, { useState } from "react";
// import HeavyComponent from "../components/HeavyComponent";
import dynamic from "next/dynamic";
const HeavyComponent = dynamic(() => import("../components/HeavyComponent")); // basic version

const HeavyComponent = dynamic(() => import("../components/HeavyComponent"), {
  ssr: false, // to protect pre-rendering
  loading: () => <p>Loading...</p>,
});

const LazyPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      Lazy Page
      <button onClick={() => setIsVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </div>
  );
};
```

_2. Lazy Load JavaScript Library_ <br>
Install lodash(Sorting and Filtering array) for testing

```bash
npm i lodash
npm install -D @types/lodash or, npm install --save-dev @types/lodash
```

- Import js library when needed

```jsx
// Scenario 1: import _ from "lodash"; Added to bundel
"use client";
import React from "react";
import _ from "lodash";

const LazyPage = () => {
  return (
    <div>
      <h1>Lazy Page</h1>
      <button
        onClick={() => {
          const users = [{ name: "c" }, { name: "b" }, { name: "a" }];
          const sorted = _.orderBy(users, ["name"]);
          console.log(sorted);
        }}
      >
        Sort
      </button>
    </div>
  );
};

// Scenario 2: const _ = (await import("lodash")).default; Same work
// Not added to bundel
<button
  onClick={async () => {
    const _ = (await import("lodash")).default;

    const users = [{ name: "c" }, { name: "b" }, { name: "a" }];
    const sorted = _.orderBy(users, ["name"]);
    console.log(sorted);
  }}
>
  Sort
</button>;
```

## Ch-10: Deployment: Fix build errors

### - Fix build errors

- From a route file we can export only GET, POST, PUT, DELETE
- Some other error found: db user id type string but we purse as int

```jsx
// route.ts  (take authOptions to a separate file)
import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// /api/auth/route.ts
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

```

### - Troubleshooting Deployment Errors

- When we deploy coming error is very common.
- Click change and overwrite build [See](https://prnt.sc/TBXJOR4urpzm)
- Deploy again

```bash
npx prisma generate && next build
```

- Remove app/api/sent-email folder and commit and push. Because we have to add production email environment for live

### -

```jsx

```
