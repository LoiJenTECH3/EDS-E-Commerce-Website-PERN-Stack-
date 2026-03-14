import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/axios";

let isInterceptorRegistered = false;

/**
 * Registers an Axios request interceptor that adds a Clerk "Bearer" token to outgoing requests when the user is signed in and exposes current auth state.
 *
 * The hook ensures only a single interceptor is registered and ejects it on cleanup.
 * @returns {{ isSignedIn: boolean, isClerkLoaded: boolean }} Object with `isSignedIn` (whether the user is signed in) and `isClerkLoaded` (Clerk's loaded state).
 */
function useAuthReq() {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  // include the token to the request headers
  useEffect(() => {
    if (isInterceptorRegistered) return;
    isInterceptorRegistered = true;

    const interceptor = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
      isInterceptorRegistered = false;
    };
  }, [isSignedIn, getToken]);

  return { isSignedIn, isClerkLoaded: isLoaded };
}

export default useAuthReq;
