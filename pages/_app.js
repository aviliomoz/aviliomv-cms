import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function checkSession() {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    setLoading(false);
  }, []);

  useEffect(
    function checkSessionChange() {
      if (!session && !loading) router.push("/login");
    },
    [session]
  );

  return <Component {...pageProps} />;
}

export default MyApp;
