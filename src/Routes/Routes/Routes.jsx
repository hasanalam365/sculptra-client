
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout/MainLayout";

import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import Homes from "../../Pages/Home/Homes";
import NotFound from "../../Components/NotFound";






export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
       errorElement: <NotFound/>,
        children: [
            {
                path: '/',
                element:<Homes/>
            },
          
           
        ]
    },
    {
        path: '/dashboard',
        element: 
            <DashboardLayout></DashboardLayout>,
        
        children:[
            {
                path: '/dashboard',
                element: <>dashboard</>
            },
           
        ]
    }
    
]);