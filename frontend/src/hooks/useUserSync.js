import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

/**
 * Synchronizes the currently authenticated Clerk user with the backend and exposes whether that sync succeeded.
 *
 * Triggers a sync when a user is signed in and user data is available; subsequent calls do not re-run while a sync is pending or after a successful sync.
 * @returns {{ isSynced: boolean }} An object with `isSynced`: `true` if the user has been successfully synced with the backend, `false` otherwise.
 */
function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const { mutate: syncUserMutation, isPending, isSuccess } = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, syncUserMutation, isPending, isSuccess]);

  return { isSynced: isSuccess };
}

export default useUserSync;
