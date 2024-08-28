import React from 'react';

interface AuthContextType {
  showAuth: boolean;
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);
