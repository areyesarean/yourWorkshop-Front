import { useRouteError } from "react-router-dom"

// Generated by https://quicktype.io

export interface RouteError {
  status:     number;
  statusText: string;
  internal:   boolean;
  data:       string;
  error:      Error;
}
interface Error {
  message: string;
  stack: string;
}

const NotFoundPage = () => {
  const error = useRouteError() as RouteError;
  console.log(error);
  
  return (
    <div>
      <h4>Error</h4>
      <p>
        {/* <i>{error.statusText || error.error.message}</i> */}
      </p>
    </div>
  )
}
export default NotFoundPage