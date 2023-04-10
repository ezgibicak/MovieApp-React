import { useContext, useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorize(props: authorizeProp) {
  const [isAuthorized, setAuthorized] = useState(false);
  const { claims } = useContext(AuthenticationContext);
  useEffect(() => {
    if (props.role) {
      const index = claims.findIndex(
        (x) => x.name === "role" && x.value === props.role
      );
      setAuthorized(index > -1);
    } else {
      setAuthorized(claims.length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claims, props.role]);
  return <>{isAuthorized ? props.authorized : props.notAuthorized}</>;
}
interface authorizeProp {
  authorized: ReactElement;
  notAuthorized?: ReactElement;
  role?: string;
}
