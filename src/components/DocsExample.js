/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
import React from 'react'

const DocsExample = (props) => {

  return (
    <div className="example">

    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DocsExample)
