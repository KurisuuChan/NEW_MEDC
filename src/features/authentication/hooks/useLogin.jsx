// src/features/authentication/hooks/useLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Corrected import path
import * as api from "@/lib/supabase/api";

export const useLogin = (onLogin) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const { error: signInError } = await api.signIn(
        credentials.email,
        credentials.password
      );
      if (signInError) throw signInError;
      onLogin();
      navigate("/");
    } catch (err) {
      const errorMessage = err.error_description || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    error,
    loading,
    handleChange,
    handleLogin,
  };
};
