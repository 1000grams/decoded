import React from "react";
import SearchBar from "../../components/catalog/SearchBar";
import FilterSidebar from "../../components/catalog/FilterSidebar";
import TrackGrid from "../../components/catalog/TrackGrid";

export default function BrowsePage() {
  return (
    <div className="flex">
      <FilterSidebar />
      <div className="flex-1">
        <SearchBar />
        <TrackGrid />
      </div>
    </div>
  );
}
