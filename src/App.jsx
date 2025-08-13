// src/App.jsx
import React, { Suspense } from "react";
// Corrected import path for the useAuth hook
import { useAuth } from "@/features/authentication/hooks/useAuth";
import LoadingScreen from "./layouts/LoadingScreen";
import FullLayout from "./layouts/FullLayout";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  const {
    isLoggedIn,
    user,
    authLoading,
    branding,
    handleLogout,
    fetchSessionAndBranding,
  } = useAuth();

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      {isLoggedIn ? (
        <FullLayout
          branding={branding}
          user={user}
          handleLogout={handleLogout}
          onUpdate={fetchSessionAndBranding}
        />
      ) : (
        <AuthLayout onLogin={fetchSessionAndBranding} branding={branding} />
      )}
    </Suspense>
  );
};

export default App;
