import ProductList from "../components/ProductList";

const HomePage = ({ token }) => (
  <div>
    <h1>Welcome to the E-commerce Platform</h1>
    <ProductList token={token} />
  </div>
);

export default HomePage;
