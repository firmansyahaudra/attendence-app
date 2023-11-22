import React from "react";
import LayoutPage from "../Pages/Layout";
import FormInput from "./Form/formInput";
import { useState } from "react";

const Pembaruan = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        status: false,
      });
      console.log(values);
    
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
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
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
            name: 'status',
            type: 'checkbox',
            label: 'Status',
            required: false,
          },
      ];

      const handleSubmit = async (e) => {
        e.preventDefault();
      };

      const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((prevValues) => ({ ...prevValues, [e.target.name]: value }));
      };

    return (
        <LayoutPage>
           <div className="w-full h-screen flex sm:flex-row items-center">
        <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-[#f5f5f5] p-4 sm:p-20 ">
          <h2 className="text-2xl font-semibold mb-2 text-center">Update</h2>
          <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                input.type === 'checkbox' ? (
                  <div key={input.id} className="w-full mb-2 flex items-center">
                    <input
                      type="checkbox"
                      name={input.name}
                      checked={values[input.name]}
                      onChange={onChange}
                      className="w-4 h-4 mr-2"
                    />
                    <label htmlFor={input.name} className="text-[#060606]">{input.label}</label>
                  </div>
                ) : (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  />
                )
              ))}
              <div className="w-full flex flex-col my-4">
                <button
                  onClick={handleSubmit}
                  className="w-full text-[#060606] my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </LayoutPage>
    )
}
export default Pembaruan;