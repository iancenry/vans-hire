import { useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()

  return (
    <>
      <div className='error-text'> <h1>Server Error, {error?.message}. Try Again Later. </h1></div>
      <pre className="error-text">{error?.status} - {error?.statusText}</pre>
    </>
  )
}

export default Error