"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import "./FAQ.css"

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [showQuestions, setShowQuestions] = useState(false)

  // Detect when the component enters viewport
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      setShowQuestions(true)
    }
  }, [inView])

  const faqData = [
    { question: "What is cryptocurrency?", answer: "Cryptocurrency is a digital or virtual form of currency..." },
    { question: "How do I buy cryptocurrency?", answer: "You can buy cryptocurrency through exchanges, brokers..." },
    { question: "What is a digital wallet?", answer: "A digital wallet is a software program that stores..." },
    { question: "Is cryptocurrency safe?", answer: "While cryptocurrency technology itself is secure..." },
    { question: "Are cryptocurrency transactions anonymous?", answer: "Cryptocurrency transactions are pseudonymous..." },
    { question: "What is blockchain?", answer: "Blockchain is a distributed digital ledger that records..." },
    { question: "How do I start trading on TNC Crypto?", answer: "To start trading on TNC Crypto, create an account..." },
    { question: "What security measures does TNC Crypto implement?", answer: "TNC Crypto implements multiple security measures..." },
    { question: "Can I access TNC Crypto on my mobile device?", answer: "Yes, TNC Crypto is fully accessible on mobile..." },
    { question: "How do I withdraw my funds from TNC Crypto?", answer: "To withdraw funds, navigate to the withdrawal section..." },
    { question: "What fees are associated with trading on TNC Crypto?", answer: "Our fee structure includes trading fees, withdrawal fees..." },
    { question: "Do you offer any educational resources for beginners?", answer: "Yes, we provide comprehensive educational resources..." },
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div ref={ref} className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      <p className="faq-subtitle">
        Discover quick answers to common queries in our comprehensive FAQ section.
      </p>

      <div className="faq-grid">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className={`faq-item ${openFAQ === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={showQuestions ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="faq-icon">{openFAQ === index ? "−" : "+"}</span>
            </div>
            <motion.div
              className="faq-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={openFAQ === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <p>{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
