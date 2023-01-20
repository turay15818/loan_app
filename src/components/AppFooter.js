import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.orange.sl/" target="_blank" rel="noopener noreferrer">
          OSL
        </a>
        <span className="ms-1">&copy; 2022</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.orange.sl/" target="_blank" rel="noopener noreferrer">
          Orange Sierra Leone &amp;
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
