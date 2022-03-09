import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface IAuthContext {
  user: any;
  // login: () => void;
  login: Function;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => null,
  logout: () => null,
  authenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
    console.log(user);
  }, [user]);
  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  const login = async ({ email: identifier, password }) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/profile");
    } else {
      setError(data.message);
      setError(null);
    }
  };
  const logout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };
  return (
    <AuthContext.Provider
      value={{ user: user, authenticated: !!user, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
