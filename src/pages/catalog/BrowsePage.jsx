<<<<<<< HEAD
﻿mport React, { useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 23d180db33d9b8ccfbbae5c78a31eb4c3edf3d9e
import SearchBar from "../../components/catalog/SearchBar";
import FilterSidebar from "../../components/catalog/FilterSidebar";
import TrackGrid from "../../components/catalog/TrackGrid";

const CATALOG_URL = process.env.REACT_APP_CATALOG_API_URL || "/api/catalog";

export default function BrowsePage() {
  const [tracks, setTracks] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch(CATALOG_URL)
      .then((res) => res.json())
      .then(setTracks)
      .catch((err) => console.error("Catalog fetch error", err));
  }, []);

  const filtered = tracks.filter((t) => {
    if (filters.genre && !(t.genre || "").includes(filters.genre)) return false;
    if (filters.mood && !(t.mood || "").includes(filters.mood)) return false;
    if (filters.bpmMin && t.bpm < Number(filters.bpmMin)) return false;
    if (filters.bpmMax && t.bpm > Number(filters.bpmMax)) return false;
    if (filters.durationMin && t.duration < Number(filters.durationMin)) return false;
    if (filters.durationMax && t.duration > Number(filters.durationMax)) return false;
    if (filters.license && t.license_type !== filters.license) return false;
    return true;
  });

  return (
    <div className="flex">
      <FilterSidebar onChange={setFilters} />
      <div className="flex-1">
        <SearchBar />
        <TrackGrid tracks={filtered} />
      </div>
    </div>
  );
}
