import { useMemo } from "react";
import { useNavigateToPersonUrl } from "../hooks/useNavigateToUrl";
import { Person } from "../types";
import { useToggleFavoritePerson } from "../hooks/useToggleFavoritePerson";

function PeopleListItem({ item }: { item: Person }) {
  const { isFavorite, toggleFavorite } = useToggleFavoritePerson(item);

  const navigate = useNavigateToPersonUrl();
  const favorite_button = useMemo(() => {
    return (
      <button onClick={toggleFavorite(item.url)} className={`${isFavorite ? "" : "remove_button"}`}>
        {isFavorite ? "Add" : "remove"}
      </button>
    );
  }, [isFavorite]);

  return (
    <div className="list_item" key={item.url} onClick={() => navigate(item.url)}>
      <div className="list_col">{item.name}</div>
      <div className="list_col">{item.height}</div>
      <div className="list_col">{item.mass}</div>
      <div className="list_col">{item.hair_color}</div>
      <div className="list_col">{favorite_button}</div>
    </div>
  );
}

export default PeopleListItem;
