// src/hooks/useCurrentUser.ts
import { useEffect, useState } from "react";

export interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
  image?: string | null;
  createdAt?: string;
  // ...outros campos que precisar
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchUser() {
      setLoading(true);
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        if (isMounted) setUser(data.user || null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
}
