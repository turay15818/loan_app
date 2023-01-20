/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React from 'react'
import { CCallout} from '@coreui/react'

const DocsCallout = (props) => {
  return (
    <CCallout color="info" className="bg-white">
      
    </CCallout>  
  )
}

DocsCallout.propTypes = {
  content: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string,
}

export default React.memo(DocsCallout)
