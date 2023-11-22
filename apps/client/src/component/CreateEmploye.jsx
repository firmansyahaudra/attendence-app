import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, setProfileImage, resetForm } from "../redux/slice/EmployeSlice"; 
import FormInput from "./Form/formInput"
import LayoutPage from '../Pages/Layout';
import axios from "axios";


const RegisterEmployee = (props) => {
  const dispatch = useDispatch();
  const employeeState = useSelector((state) => state.employee);

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await axios.post('http://localhost:2023/user/create-employee', values);

      localStorage.setItem('user', JSON.stringify(values));
      dispatch(resetForm());
    } catch (error) {
      console.error('Error registering employee:', error);
    }
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-30 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,30}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 5,
      name: "role",
      type: "select", 
      placeholder: "Select Role",
      label: "Role",
      options: ["HR", "Employee"], 
      required: true,
    },
  ];


  return (
    <LayoutPage>
    <div className=" mx-auto mt-8">
    <h1 className="text-2xl font-bold mb-4 text-center">Register Employee</h1>
    <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Profile Image</label>
          <div className="flex items-center mt-2">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
              {employeeState.profileImage ? (
                <img
                  src={employeeState.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-6-9h12"
                    ></path>
                  </svg>
                  <span className="ml-1">Add a profile image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="ml-4"
              onChange={handleImageChange}
            />
          </div>
        </div>
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
            errorMessage={input.errorMessage}
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
          Register
        </button>
      </form>
    </div>
    </LayoutPage>
  );
};

export default RegisterEmployee;

