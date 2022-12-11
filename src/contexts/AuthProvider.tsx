import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../services/firebase";

interface AuthContextInterface {
  currentUser: User | null;
  signup: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
  logout: () => Promise<void> | undefined;
}

function signup(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

function logout() {
  return auth.signOut();
}

const AuthContext = createContext<AuthContextInterface>({
  currentUser: null,
  signup,
  login,
  logout,
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
