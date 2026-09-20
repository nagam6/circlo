import ItemCard from "../components/ItemCard";

const items = [
  {
    id: 1,
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
];

const ExplorePage = () => {
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

      <div className="items-grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            image={item.image}
            title={item.title}
            category={item.category}
            location={item.location}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default ExplorePage;