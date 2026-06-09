// Client-side auth store that calls API routes

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

class AuthStore {
  private currentUser: User | null = null;

  constructor() {
    // Check if user is logged in (from localStorage)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("scipaper_user");
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
  }

  async signUp(email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to create account" };
      }

      const user: User = {
        ...data.user,
        createdAt: new Date(data.user.createdAt),
      };

      this.currentUser = user;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("scipaper_user", JSON.stringify(user));
      }

      return { success: true, user };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: "Failed to create account" };
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Failed to sign in" };
      }

      const user: User = {
        ...data.user,
        createdAt: new Date(data.user.createdAt),
      };

      this.currentUser = user;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("scipaper_user", JSON.stringify(user));
      }

      return { success: true, user };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: "Failed to sign in" };
    }
  }

  signOut(): void {
    this.currentUser = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("scipaper_user");
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authStore = new AuthStore();
