// src/helpers/localStorage.ts

export function setItem<T = any>(key: string, value: T) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItem<T = any>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
  return null;
}

export function removeItem(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

export function getBoolean(key: string): boolean {
  const value = getItem(key);
  return value === true || value === "true";
}
