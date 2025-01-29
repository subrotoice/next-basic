import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const LoginLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions); // api/auth/[...nextauth]/route.ts
  return (
    <div>
      <h1>LoginLayout</h1>
      {session?.user?.name}
      {children}
    </div>
  );
};

export default LoginLayout;
