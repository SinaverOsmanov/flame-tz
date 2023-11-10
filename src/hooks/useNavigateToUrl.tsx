import { useNavigate } from "react-router-dom";
import { extractIValueFromUrl } from "../helpers/extractValueFromUrl";

export function useNavigateToPersonUrl() {
  const navigate = useNavigate();

  function navigateToIdFromUrl(url: string) {
    const pattern = /https:\/\/swapi\.dev\/api\/people\/(\d+)\//;
    const result = extractIValueFromUrl(url, pattern);

    if (!result) {
      return;
    } else {
      navigate(`/peoples/${result}`);
    }
  }

  return navigateToIdFromUrl;
}
