import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { useState } from "react";
import login from "../../redux/slice/EmployeSlice"

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role:"",
   });
   console.log(values);

   const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(values);
      const response = await axios.post("http://localhost:2023/user/login", values);
      

      if (success) {
        const { role, token } = result;
        localStorage.setItem("user", JSON.stringify(values));
        dispatch(login(values));

        if (values.role === "HR") {
          navigate("/layout");
        } else if (values.role === "Employee "){
          navigate("/dashboard");
        }
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };


  return (
    <div className=" w-full h-screen flex flex-col sm:flex-row items-center justify-center">
      <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-white flex flex-col p-4 sm:p-20 ">
        <div className="w-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-2 text-center flex items-center justify-center">Login</h2>

                <div className="w-full flex flex-col">
                <input 
                type="email"
                placeholder="Email"
                onClick={onChange}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black rounded-md "
                style={{ border: "1px solid"}}
                />
                <input 
                type="password"
                placeholder="Password"
                onClick={onChange}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black rounded-md "
                style={{ border: "1px solid"}}
                />
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <p className="text-sm">Remember Me</p>
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forget Password ?</p>
                </div>
                <div className="w-full flex flex-col my-4">
                    <button 
                    onClick={handleLogin}
                    className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                        Log in
                    </button>
                </div>
        </div>
      </div>
    </div>
  );
};
export default Login;