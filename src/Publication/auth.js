const baseURL = "https://cisksbackend1-0.onrender.com/api";

export const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${baseURL}/check-auth`, {
      method: "GET",
      credentials: "include",
    });
  
      const data = await response.json();
  
      if (response.ok && data.loggedIn) {
        localStorage.setItem("userLoggedIn", true);
        localStorage.setItem("userId", data.user.id);
        console.log("User authenticated:", data.user);
        return { loggedIn: true, user: data.user };
      } else {
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userId");
        console.log("User not authenticated");
        return { loggedIn: false };
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      return { loggedIn: false };
    }
  };
  
  export const logoutUser = async () => {
    try {
      const response = await fetch(`${baseURL}/Logout`, {
      method: "POST",
      credentials: "include",
    });
  
      if (response.ok) {
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userId");
        console.log("Logged out successfully");
        return true;
      } else {
        console.log("Logout failed");
        return false;
      }
    } catch (err) {
      console.error("Logout error:", err);
      return false;
    }
  };
  