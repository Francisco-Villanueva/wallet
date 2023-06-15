import { useEffect, useState } from "react";

export function useLocalStorage ({user}) {  
  const storedUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState(JSON.parse(storedUser));


  const setUserStorage = () => {
    const updateUser = localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser( (updateUser));
  }

  
  useEffect(() => {
    // Obtener currentUser almacenado en el Local Storage
   
    setUserStorage();
  }, [user]);


  return {currentUser, setUserStorage};

}