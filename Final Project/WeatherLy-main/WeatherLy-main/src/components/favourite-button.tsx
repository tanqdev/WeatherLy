import type { WeatherData } from "@/api/types";
import { useFavorites } from "@/hooks/use-favourites";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface FavouriteButtonProps {
  data: WeatherData;
}
export function FavoriteButton({ data }: FavouriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={
        isCurrentlyFavorite
          ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
          : "cursor-pointer"
      }
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}
