import { useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const UserSignUp = () => {
  const [loading, setLoading] = useState(false);

 const {setauthUser}=useAuthContext()

 
  const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
    
    const success = handleInputError({ fullname, username, password, confirmpassword, gender });

    if (!success) return;

    try {
      setLoading(true); 
      const response = await axios.post("http://localhost:8001/api/auth/signup", {
        fullname,
        username,
        password,
        confirmpassword,
        gender,
      });
      const data = await response.data;
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user",JSON.stringify(data))
      setauthUser(data)

      toast.success('SignUp Successfully')


    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return { loading, signup };
};

export default UserSignUp;

// Corrected function name here as well
function handleInputError({ fullname, username, password, confirmpassword, gender }) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill all fields");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Passwords don't match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
