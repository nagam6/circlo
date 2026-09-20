import { useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

type ExploreItem = {
  id: number;
  mongoId?: string;
  image: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
};

const items: ExploreItem[] = [  {
    id: 1,
    mongoId: "6ab00616e2a359a0ef34eae2",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    title: "Sony A7 IV Camera",
    category: "Cameras",
    location: "Nazareth",
    price: 120,
    rating: 4.9,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80",
    title: "Studio LED Light Kit",
    category: "Lighting",
    location: "Haifa",
    price: 80,
    rating: 4.8,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80",
    title: "Professional Podcast Microphone",
    category: "Audio & Recording",
    location: "Nazareth",
    price: 60,
    rating: 4.7,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    title: "Canon EOS R6",
    category: "Cameras",
    location: "Tel Aviv",
    price: 150,
    rating: 4.9,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
    title: "Wireless Microphone Kit",
    category: "Audio & Recording",
    location: "Haifa",
    price: 95,
    rating: 4.6,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1520901157461-9b38acc27fbe?auto=format&fit=crop&w=900&q=80",
    title: "Softbox Lighting Set",
    category: "Lighting",
    location: "Nazareth",
    price: 70,
    rating: 4.8,
  },
];

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !category || item.category === category;

      const matchesLocation =
        !location || item.location === location;

      const matchesPrice =
        !maxPrice || item.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesPrice
      );
    });
  }, [search, category, location, maxPrice]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setMaxPrice("");
  };

  return (
    <section className="explore-page">
      <div className="explore-header">
        <div>
          <p className="page-eyebrow">Explore Circlo</p>
          <h1>Find equipment for your next project</h1>
          <p>
            Cameras, lighting and audio equipment available for short-term
            rental.
          </p>
        </div>
      </div>

      <div className="explore-controls">
        <SearchBar value={search} onChange={setSearch} />

        <FilterPanel
          category={category}
          location={location}
          maxPrice={maxPrice}
          onCategoryChange={setCategory}
          onLocationChange={setLocation}
          onMaxPriceChange={setMaxPrice}
          onClear={clearFilters}
        />
      </div>

      <div className="results-row">
        <strong>{filteredItems.length} items found</strong>
      </div>

      {filteredItems.length > 0 ? (
        <div className="items-grid">
          {filteredItems.map((item) => (
         <ItemCard
  key={item.id}
  itemId={item.mongoId}
  image={item.image}
  title={item.title}
  category={item.category}
  location={item.location}
  price={item.price}
  rating={item.rating}
/>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <h3>No equipment found</h3>
          <p>Try changing your search or filters.</p>
          <button onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </section>
  );
};

export default ExplorePage;