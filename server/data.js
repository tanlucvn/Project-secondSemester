import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Duy",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Luc",
      email: "luc123@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Nike Slim shirt",
      slug: "nike-slim-shirt",
      category: "Shirts3",
      image: "/images/p1.jpg", // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: "fghj",
      rating: 5,
      numReviews: 7,
      description: "high quality shirt",
    },

    {
      name: "shirt",
      slug: "shirt",
      category: "Shirts",
      image: "/images/p2.jpg", // 679px × 829px
      price: 10,
      countInStock: 9,
      brand: "1234134",
      rating: 4,
      numReviews: 10,
      description: " quality shirt",
    },
    {
      name: "123",
      slug: "shi2345rt",
      category: "Shirts",
      image: "/images/p3.jpg", // 679px × 829px
      price: 10,
      countInStock: 9,
      brand: "1234134",
      rating: 4,
      numReviews: 10,
      description: " quality shirt",
    },
    {
      name: "shi5685678rt",
      slug: "shi6789rt",
      category: "Shi6789rts",
      image: "/images/p4.jpg", // 679px × 829px
      price: 10,
      countInStock: 9,
      brand: "1234134",
      rating: 4,
      numReviews: 10,
      description: " quality shirt",
    },
  ],
};
export default data;
