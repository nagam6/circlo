type FilterPanelProps = {
  category: string;
  location: string;
  maxPrice: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
};

const FilterPanel = ({
  category,
  location,
  maxPrice,
  onCategoryChange,
  onLocationChange,
  onMaxPriceChange,
  onClear,
}: FilterPanelProps) => {
  return (
    <div className="filter-panel">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Cameras">Cameras</option>
        <option value="Lighting">Lighting</option>
        <option value="Audio & Recording">Audio & Recording</option>
      </select>

      <select
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Nazareth">Nazareth</option>
        <option value="Haifa">Haifa</option>
        <option value="Tel Aviv">Tel Aviv</option>
      </select>

      <input
        type="number"
        placeholder="Max price / day"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
      />

      <button type="button" className="clear-filter-btn" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default FilterPanel;