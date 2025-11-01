// user.jsx
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast,{Toaster} from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]); //  store logged in user here
  const [isAuth, setIsauth] = useState(false)
  const [btnload, setBtnload] = useState(false)
  const [loading, setLoading] = useState(true)

  // Register 
  async function registerUser(name,email,password,navigate){
    setBtnload(true)
    try {
        const{data}=await axios.post("/api/user/reg",{
            name,email,password
        })
        toast.success(data.message)
        setUser(data.user)
        setIsauth(true)
        setBtnload(false)
        navigate('/')

        
    } catch (error) {
        toast.error(error.response.data.message)
            setBtnload(false)
        
    }
  }

  //login in
  async function loginUser(email,password,navigate){
    setBtnload(true)
    try {
        const{data}=await axios.post("/api/user/login",{
            email,password
        })
        toast.success(data.message)
        setUser(data.user)
        setIsauth(true)
        setBtnload(false)
        navigate('/')

        
    } catch (error) {
        toast.error(error.response.data.message)
            setBtnload(false)
        
    }
  }

  //Login Out
 async function logoutUser(navigate) {
  try {
    const { data } = await axios.get("/api/user/logout", { withCredentials: true });
    toast.success(data.message);
    navigate("/login"); // redirect to login page
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
}

  // user Get data
  async function getuser(){
    try {
        const {data}=await axios.get("/api/user/me")
       console.log(data);
       
        setUser(data)
        setIsauth(true)
        setLoading(false)
    } catch (error) {
        console.log(error);
        setIsauth(false)
        setLoading(false)
        
        
    }
  }


  // song saved 
  async function saveplaysong(id) {
    try {
       const {data}=await axios.post('/api/user/saved/'+id)
       toast.success(data.message)
       await getuser()
    } catch (error) {
      toast.error(error.response.data.message)
      
    }
    
  }

  useEffect(()=>{
    getuser()
  },[])

  return (
    <UserContext.Provider value={{registerUser,user,isAuth,btnload, loading,loginUser,logoutUser,saveplaysong }}>
      {children}
      <Toaster/>
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
