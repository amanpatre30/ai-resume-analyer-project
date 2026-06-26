import React, { useContext } from 'react'
import style from "./SideBar.module.css"

import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';

const SideBar = () => {

  const location = useLocation();
  const navigate = useNavigate()
  const { isLogin, setLogin, setUserInfo, userInfo } = useContext(AuthContext)
  const handleLogout = () => {
    localStorage.clear()
    setLogin(false);
    setUserInfo(null);
    navigate('/')
  }
  return (
    <div className={style.sideBar}>

      <div className={style.sideBarIcon}>
        <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />
        <div className={style.sideBarTopContent}>
          Resume Screening
        </div>
      </div>

      <div className={style.sideBarOptionBlock}>

        <Link
          to="/dashboard"
          className={`${style.sideBarOption} ${location.pathname === "/dashboard"
            ? style.selectedOption
            : ""
            }`}
        >
          <DashboardIcon sx={{ fontSize: 22 }} />
          <div>Dashboard</div>
        </Link>

        <Link
          to="/history"
          className={`${style.sideBarOption} ${location.pathname === "/history"
            ? style.selectedOption
            : ""
            }`}
        >
          <HistoryIcon sx={{ fontSize: 22 }} />
          <div>History</div>
        </Link>

        {userInfo?.role === "admin" && <Link
          to="/admin"
          className={`${style.sideBarOption} ${location.pathname === "/admin"
            ? style.selectedOption
            : ""
            }`}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 22 }} />
          <div>Admin</div>
        </Link>}

        <div onClick={handleLogout} className={style.sideBarOption}>
          <LogoutIcon sx={{ fontSize: 22 }} />
          <div>LogOut</div>
        </div>

      </div>
    </div>
  )
}

export default SideBar;