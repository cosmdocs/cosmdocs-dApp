import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import queryString from "query-string";


// Hook
export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useNavigate();
  const match = useMatch();
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
     
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
    
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}