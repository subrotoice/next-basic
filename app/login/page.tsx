"use client";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect } from "react";

const Login = async () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log({ email, password });

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log(result);
  }

  return (
    <div>
      <form
        className="flex flex-col gap3 max-w-5xl space-y-4 md:space-y-6"
        onSubmit={handleSubmit}
      >
        <input type="email" name="email" id="" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
