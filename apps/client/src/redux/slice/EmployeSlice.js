import {createSlice} from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        username: "",
        email: "",
        password: "",
        role: "",
        profileImage: null,
    },
    reducers: {
        register: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.role = action.payload.role;
        }, 
        setProfileImage: (state, action) => {
            state.profileImage = action.payload;
          },
          login: (state,action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.role = action.payload.role;
          },
          resetForm: (state) => {
            state.username = "";
            state.email = "";
            state.password = "";
            state.confirmPassword = "";
            state.role = "";
            state.profileImage = null;
          },
    },
});

export const { register, setProfileImage, resetForm} = employeeSlice.actions;
export default employeeSlice.reducer;