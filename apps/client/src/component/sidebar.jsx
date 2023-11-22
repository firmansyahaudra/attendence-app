import React from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { UserPlus, RefreshCw, UserX } from "lucide-react";
import { useContext, createContext, useState } from "react"
import {useNavigate} from "react-router-dom"



const Sidebar = ({active}) => {
  const [expanded, setExpanded] = useState(true)
  const navigate = useNavigate();
  const menu = [
    {
      id: 1, 
      title: "Register Employee",
      icon: <UserPlus size={40} className="mx-auto"/>,
      path: "/sidebar/register_employee"
    },
    {
      id: 2, 
      title: "Update",
      icon: <RefreshCw size={40} className="mx-auto"/>,
      path: "/sidebar/pembaruan"
    },
    {
      id: 3, 
      title: "Delete Employee",
      icon: <UserX size={40} className="mx-auto"/>,
      path: "/sidebar/delete"
    },
  ];

  return (

        // <div className="h-screen w-1/2">
      <nav className="h-full w-1/6 flex flex-col bg-red-500 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>


        <div className={`
        relative flex flex-col items-center gap-4 py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            // ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            // : "hover:bg-indigo-50 text-gray-600"
        }
    `}
        style={{height: 600}}>
            {menu.map((val) => (
              <div
              key={val.id}
              onClick={() => navigate(val.path)}
              className="cursor-pointer text-gray-500 hover:bg-gray-200 hover:text-gray-500 rounded-md"
              >
                <div className="hover:text-green-500">{val.icon}</div>
                <p className={`text-center hover:text-green-500 overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}>{val.title}</p>
              </div>
            ))}
        </div>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Audra Firmansyah</h4>
              <h5 className="text-xs text-blue-600">firmansyahaudra@gmail.com</h5>
            </div>
            <MoreVertical size={40} />
          </div>
        </div>
      </nav>
      // </div>

  )
};
export default Sidebar;

