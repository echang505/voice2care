import './App.css'
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import {HomePage, MakeRequestPage, ManagementBoardPage} from '../features';
import type { PageStatus } from '../types';


function App() {
  const [pageStatus, setPageStatus] = useState<PageStatus>("homePage");

  return (
    <>
      <div className="w-full bg-gray-300 min-h-screen">
        <Navbar setPageStatus={setPageStatus}/>
        <>
        {
          pageStatus=== "homePage" ? <HomePage /> :
          // pageStatus === "loginPage" ? <LoginPage /> :
          // pageStatus === "registerPage" ? <RegisterPage /> :
          pageStatus === "makeRequestPage" ? <MakeRequestPage /> :
          pageStatus === "managementBoardPage" ? <ManagementBoardPage /> :
          <div className="text-center text-red-500">Error: Unknown Page Status</div>
        }
        </>
      </div>
    </>
  )
}

export default App
