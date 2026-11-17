import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { isDemoMode } from "../../utils/demoMode";

const demoUser = {
  user_metadata: { fullName: "Demo Visitor", avatar: "" },
  email: "demo@example.invalid",
};

export function useUser() {
  const { isLoading, data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === "authenticated";
  const isDemoVisitor = isDemoMode && !isLoading && !error && !isAuthenticated;

  return {
    isLoading,
    user: isDemoVisitor ? demoUser : user,
    isAuthenticated,
    isDemoVisitor,
  };
}
