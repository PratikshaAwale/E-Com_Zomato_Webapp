import "./Inspiration.css"
const inspirationData=[
    {
        id: 1,
        name:"Biryani",
        image: "https://www.bing.com/th/id/OIP.tXvou9zzvr2zFXH53go9fwHaE8?w=284&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    },
    {
        id: 2,
        name: "Burger",
        image:"https://www.bing.com/th/id/OIP.uPJNhmsCGP72JL72DmMLfwHaE8?w=272&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2 "
    },
    {
        id: 3,
        name:"Pizza",
        image: "https://www.bing.com/th/id/OIP.SEfXqwWqK1NNMpH9ZmNrgwHaE8?w=258&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    },
    {
        id: 4,
        name:"Chicken",
        image: "https://th.bing.com/th/id/OIP.43iJhOw9YpqZSrnkQhu58AHaLH?w=99&h=108&c=7&qlt=90&bgcl=40fea3&r=0&o=6&dpr=1.5&pid=13.1"
    },
    {
        id:5,
        name:"Cake",
        image:"https://www.bing.com/th/id/OIP.LaHWYFfnsTJQ8ABTFyzbYAHaF7?w=268&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    },
    {
        id:6,
        name: "Rolls",
        image:"https://www.bing.com/th/id/OIP.aFwUyCPzYeLa8PXseEjxNgHaHa?w=160&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    },
    {
        id:7,
        name: "Thali",
        image: "https://www.bing.com/th/id/OIP.4rtWNgC-MH6eSW9RKYhfkgHaF7?w=265&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    }

];

const Inspiration = () => {
  return (
    <div className="inspiration-wrapper">
      <h2 className="inspiration-title">
        Inspiration for your first order
      </h2>

      <div className="inspiration-list">
        {inspirationData.map((item) => (
          <div key={item.id} className="inspiration-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inspiration;