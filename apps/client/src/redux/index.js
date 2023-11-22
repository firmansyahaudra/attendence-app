import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slice/EmployeSlice"

const globalState = configureStore({
    reducer: {
        employee: employeeReducer,
    },
});

export default globalState;