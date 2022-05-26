import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);

  const [session, setSession] = useState(null);

  useEffect(function checkSession() {
    setSession(supabase.auth.session());
  }, []);

  useEffect(
    function checkSessionChange() {
      if (session) router.push("/");
    },
    [session, router]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error, session, user } = await supabase.auth.signIn(
        { email },
        { shouldCreateUser: false }
      );

      if (error) setLoginError(error);

      if (!error && !session && !user)
        setLoginSuccess("Se acaba de enviar un enlace mágico a tu correo");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
        <label className="font-semibold">
          Email:{" "}
          <input
            className="outline-none border-[1px] rounded-md shadow-sm p-2 ml-2 w-60"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading} className="text-white font-semibold bg-black p-2 rounded-md mt-6">
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </form>
      {loginError && (
        <span className="absolute bottom-16 bg-red-500 text-white p-4 rounded-md">
          {/* Los datos ingresados son inválidos */}
          {loginError.message}
        </span>
      )}
      {loginSuccess && (
        <span className="absolute bottom-16 bg-green-500 text-white p-4 rounded-md">
          {loginSuccess}
        </span>
      )}
    </div>
  );
};

export default LoginPage;
