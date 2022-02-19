import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useWallet({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  const { data: wallet, mutate: mutateWallet } = useSWR("/api/wallet");

  useEffect(() => {
    if (!redirectTo || !wallet) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !wallet) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && wallet?.connected)
    ) {
      Router.push(redirectTo);
    }
  }, [wallet, redirectIfFound, redirectTo]);

  return { wallet, mutateWallet };
}
