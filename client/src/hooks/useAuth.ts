import { useQuery } from "@tanstack/react-query";

// Define the user interface based on Replit OIDC response
export interface ReplitUser {
  sub: string; // Stable user ID
  username?: string; // Replit username
  email?: string; // User's email if available
  first_name?: string | null; 
  last_name?: string | null;
  bio?: string | null;
  profile_image_url?: string; // URL to user's profile picture
}

export function useAuth() {
  const { data: user, isLoading } = useQuery<ReplitUser | null>({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}