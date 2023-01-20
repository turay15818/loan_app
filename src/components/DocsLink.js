/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React from 'react'

const DocsLink = (props) => {

  return (
    <div className="float-end">
     
    </div>
  )
}

DocsLink.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
}

export default React.memo(DocsLink)
