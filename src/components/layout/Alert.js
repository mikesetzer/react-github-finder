const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fa fa-info-circle" />&nbsp;{alert.msg}
      </div>
    )
  )
}

export default Alert
