import React from "react";
import LayoutPage from "../Pages/Layout";
import FormInput from "./Form/formInput";
import { useState } from "react";
import { resetForm } from "../redux/slice/EmployeSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const DeleteAccount = () => {
    const dispatch = useDispatch();
        const [values, setValues] = useState({
        username: "",
        email: "",
        role: "",
      });
      

      const [deleteStatus, setDeleteStatus] = useState(null);
    
      const inputs = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          label: "Username",
          required: true,
        },
        {
          id: 2,
          name: "email",
          type: "email",
          placeholder: "Email",
          label: "Email",
          required: true,
        },
        {
            id: 3,
            name: "role",
            type: "select", 
            placeholder: "Select Role",
            label: "Role",
            options: ["HR", "Employee"], 
            required: true,
          },
      ];

      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

      const handleDeleteAccount = async () => {
        try {
          // Make API request to delete account
          const response = await axios.delete(`http://localhost:2023/user/delete-employee/${values.username}`);
          const { success, message } = response.data;
    
          if (success) {
            dispatch(resetForm());
            setDeleteStatus("success");
          } else {
            setDeleteStatus("error");
          }
        } catch (error) {
          console.error("Error deleting account:", error);
          setDeleteStatus("error");
        }
      };


    return (
        <LayoutPage>
     <div className=" mx-auto mt-8">
    <form className="max-w-md mx-auto " >
      {inputs.map((input) => (
        input.type === "select" ? (
          <div key={input.id} className="w-full mb-2">
            <label className="text-sm text-[#060606] mb-1">{input.label}</label>
            <select
              name={input.name}
              value={values[input.name]}
              onChange={handleChange}
              className="w-full py-2 my-2 bg-transparent outline-none focus:outline-none rounded-md"
              style={{ border: '1px solid #000' }}
              required={input.required}
            >
              <option value="" disabled hidden className="text-[#a0aec0]">{input.placeholder}</option>
              {input.options.map((option) => (
                <option key={option} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <FormInput
            key={input.id}
            label={input.label}
            onChange={handleChange}
            id={input.id}
            {...input}
            value={values[input.name]}
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
          />
        )
      ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center"
          style={{ display: 'block', margin: '0 auto' }}
        >
          Delete
        </button>
      </form>
      {deleteStatus === "success" && (
          <div className="text-green-600 mt-4">
            Account deleted successfully!
          </div>
        )}

        {deleteStatus === "error" && (
          <div className="text-red-600 mt-4">
            Account not found. Please check your input.
          </div>
        )}
    </div>
        </LayoutPage>
    )
};
export default DeleteAccount;