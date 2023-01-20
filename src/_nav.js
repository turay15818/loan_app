/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilMoney,
  cilSpeedometer,
  cilUserFemale
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Loan',
    to: '/base/loanList',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Profile',
    to: '/base/userList',
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
  },



  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://www.orange.sl/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
