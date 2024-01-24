import React from 'react'
import { SideBar2 } from './_component/SideBar'
import DashboardFooter from './_component/DFooter'


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
                {/* <SideBar /> */}
                <SideBar2 />

                <div className="flex-grow pb-20 pt-8">{children}</div>

        </>
    )
}

export default AdminLayout