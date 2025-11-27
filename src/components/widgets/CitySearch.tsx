import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, Search, Star, XCircle } from "lucide-react";
import { useSearchLocationQuery } from "@/hooks/useWeather";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router";
import { useFavoriteStore, useSearchStore } from "@/store/store";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { history, addToHistory, clearHistory } = useSearchStore();
  const { favoriteHistory } = useFavoriteStore();
  const navigate = useNavigate();

  const { data: locations, isLoading } = useSearchLocationQuery(query);

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    setOpen(false);
    addToHistory({
      name,
      country,
      lat: Number(lat),
      lon: Number(lon),
    });
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="flex-1 relative w-full justify-start text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No Cities found</CommandEmpty>
          )}
          {/* Favorite Search  */}
          {favoriteHistory.length > 0 && (
            <CommandGroup heading="Favorites">
              {favoriteHistory.map((city) => (
                <CommandItem
                  key={`${city.name}-y`}
                  value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                  onSelect={handleSelect}
                >
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{city.name}</span>
                  <span className="text-sm text-muted-foreground">
                    , {city.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />
          {history.length > 0 && (
            <CommandGroup heading="Recent Searches">
              <Button variant="ghost" size="sm" onClick={() => clearHistory()}>
                <XCircle className="h-4 w-4" />
                Clear
              </Button>
              {history.map((city) => (
                <CommandItem
                  key={`${city.country}-x`}
                  onSelect={() =>
                    handleSelect(
                      `${city.lat}|${city.lon}|${city.name}|${city.country}`,
                    )
                  }
                >
                  <span>{city.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ,{city.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat} - ${location.lon} `}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 w-4 h-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        ,{location.state}
                      </span>
                    )}
                    {location.country && (
                      <span className="text-sm text-muted-foreground">
                        ,{location.country}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
