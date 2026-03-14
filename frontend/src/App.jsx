import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";

 
/**
 * Render the main application layout and client routes once authentication is initialized.
 *
 * Triggers user data synchronization as a side effect and returns null while authentication is still loading.
 * @returns {JSX.Element|null} The application's root React element when authentication is initialized, or `null` while authentication is loading.
 */
function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;
  
  return (
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:id" element={<EditProductPage />} />

          </Routes>
        </main>
        
        
      </div>
  );
}

export default App;


