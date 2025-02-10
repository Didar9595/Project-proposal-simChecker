'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// Create the UserContext
const UserContext = createContext();

// Provide default values
const defaultContextValue = {
  user: null,
  isSignedIn: false,
  // setUser: () => {},
  // logout: () => {},
};

// UserContext Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if token exists in localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsSignedIn(true);
      const decodedUser = jwtDecode(token);
      if (decodedUser.UID) {
        fetchHodDetails(token)
      }
      else {
        // Optionally, fetch user details if the token exists
        fetchUserDetails(token);
      }

    } else {
      setIsSignedIn(false);
    }
  }, []);

  // Fetch user details from API using token
  const fetchUserDetails = async (token) => {
    try {
      const res = await fetch('/api/user/getUser', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);  // Set user details if the request is successful
        console.log("Success")
      } else {
        console.error('Failed to fetch user details:', data.message);
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setIsSignedIn(false);
    }
  };

  const fetchHodDetails = async (token) => {
    try {
      const res = await fetch('/api/hod/getHod', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);  // Set user details if the request is successful
        console.log("Success")
      } else {
        console.error('Failed to fetch user details:', data.message);
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setIsSignedIn(false);
    }
  };

  // Logout function to clear localStorage and reset user context
  //const logout = () => {
  //  localStorage.removeItem('token');
  //  setUser(null);
  //  setIsSignedIn(false);
  //};

  return (
    <UserContext.Provider value={{ user, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUserContext = () => useContext(UserContext);
