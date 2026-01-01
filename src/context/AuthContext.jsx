import { createContext, useContext, useEffect, useMemo, useState } from "react";
import keycloak from "../auth/keycloak";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    keycloak
      .init({
        onLoad: "login-required",
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then((auth) => {
        if (!mounted) return;
        setAuthenticated(auth);
        setUser(keycloak.tokenParsed ?? null);
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
      })
      .finally(() => {
        if (!mounted) return;
        setReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      user,
      token: keycloak.token,
      login: () => keycloak.login(),
      logout: () => keycloak.logout(),
      hasRole: (role) => (keycloak.tokenParsed?.realm_access?.roles ?? []).includes(role),
    }),
    [ready, authenticated, user]
  );

  if (!ready) return <div style={{ padding: 16 }}>Carregando autenticação…</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
};
