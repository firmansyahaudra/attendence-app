import React from "react";
import Sidebar from "../../component/sidebar";



const LayoutPage = (props) => {
    return (
        <div className="flex flex-row">
            <Sidebar/>
            {props.children}
        </div>
    )
};

export default LayoutPage;