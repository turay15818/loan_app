import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const UserList = React.lazy(() => import('./views/base/tables/UserList'))
const LoanList = React.lazy(() => import('./views/base/tables/Loan'))
const ApprovedLoan = React.lazy(() => import('./views/base/tables/ApprovedLoan'))
const RejectedLoan = React.lazy(() => import('./views/base/tables/RejectedLoan'))
const LoanByDetails = React.lazy(() => import('./views/base/tables/LoanByDetails'))
const EditUser = React.lazy(() => import('./views/base/tables/EditUsers'))
const EditLoan = React.lazy(() => import('./views/base/tables/EditLoan'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/loanList', name: 'Loan', element: LoanList },
  { path: '/base/approvedLoan', name: 'Approved Loan', element: ApprovedLoan },
  { path: '/base/rejectedLoan', name: 'Rejected Loan', element: RejectedLoan },
  { path: '/base/LoanList/edit/:uid', name: 'Tables', element: EditLoan },
  { path: '/base/loanList/:uid', name: 'Tables', element: LoanByDetails },
  { path: '/base/userList', name: 'Tables', element: UserList },
  { path: '/base/users/edit/:uid', name: 'Tables', element: EditUser },
  { path: '/charts', name: 'Charts', element: Charts },

  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
