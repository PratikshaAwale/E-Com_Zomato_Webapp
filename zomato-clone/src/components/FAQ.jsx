import { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "Popular cuisines near me?",
    answer:
      "Beverages near , meBiryani near , meBurger near , meCafe near meChinese near ,meCoffee near ,meDesserts near meIce Cream near , meKebab near, meMaharashtrian near , meModern Indian near, meMughlai near, meNorth Indian near ,mePizza near meRolls near meSandwich near meShake near ,meSouth Indian near meStreet near meTea near me"
  },
  {
    question: "Popular restaurant types near me?",
    answer:
      "Select a restaurant, choose your dishes, add them to cart, and proceed to checkout."
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before it is prepared by the restaurant."
  },
  {
    question: "Do you charge delivery fees?",
    answer:
      "Delivery fees depend on the restaurant and distance from your location."
  },
  {
    question: "Is online payment safe?",
    answer:
      "Yes, all payments are secured using trusted payment gateways."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Explore options near me</h2>

      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span>{openIndex === index ? "−" : "+"}</span>
          </div>

          {openIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
