import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

/* Demo users (role-based) */
const demoUsers = {
  admin: {
    id: "1",
    email: "admin@hospital.com",
    name: "Dr. Umaima Arsad",
    role: "admin",
    department: "Administration",
  },
  doctor: {
    id: "2",
    email: "doctor@hospital.com",
    name: "Dr. Usman",
    role: "doctor",
    department: "Cardiology",
  },
  nurse: {
    id: "3",
    email: "nurse@hospital.com",
    name: "Sunita",
    role: "nurse",
    department: "ICU",
  },
  receptionist: {
    id: "4",
    email: "reception@hospital.com",
    name: "James Brown",
    role: "receptionist",
    department: "Front Desk",
  },
  pharmacist: {
    id: "5",
    email: "pharmacy@hospital.com",
    name: "Dr. Lisa Anderson",
    role: "pharmacist",
    department: "Pharmacy",
  },
  lab_technician: {
    id: "6",
    email: "lab@hospital.com",
    name: "Robert Taylor",
    role: "lab_technician",
    department: "Laboratory",
  },
  accountant: {
    id: "7",
    email: "accounts@hospital.com",
    name: "Jennifer Davis",
    role: "accountant",
    department: "Finance",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (email, password, role) => {
    // Fake API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const demoUser = demoUsers[role];
    if (demoUser) {
      setUser(demoUser);
    } else {
      alert("Invalid credentials");
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
