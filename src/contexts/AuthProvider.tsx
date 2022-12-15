import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
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
import { LocalUserType } from "../screens/Signup";
import { auth } from "../services/firebase";

interface AuthContextInterface {
  currentUser: User | null;
  localUser: LocalUserType | null;
  signup: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
  login: (
    email: string,
    password: string
  ) => Promise<UserCredential> | undefined;
  logout: () => Promise<void> | undefined;
  verifyEmail: () => Promise<void> | undefined;
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

function verifyEmail() {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser);
  } else {
    throw new Error(AuthErrorCodes.USER_DELETED);
  }
}

const AuthContext = createContext<AuthContextInterface>({
  currentUser: null,
  localUser: null,
  signup,
  login,
  logout,
  verifyEmail,
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [localUser, setLocalUser] = useState<LocalUserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        sessionStorage.clear();
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const userFromSession = sessionStorage.getItem("USER");
    if (userFromSession) {
      setLocalUser(JSON.parse(userFromSession));
    } else {
      setLocalUser(null);
    }
  }, []);

  const value = {
    currentUser,
    localUser,
    signup,
    login,
    logout,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
