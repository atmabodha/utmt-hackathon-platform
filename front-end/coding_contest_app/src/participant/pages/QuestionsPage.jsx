import React, { useState } from 'react';
import '../../utilities/styles/QuestionsPage.css';
import Header from '../../host/components/header/Header';

const QuestionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);
  
  const questions = [
    { id: 1, question: "What is the purpose of life according to the Bhagavad Gita?" },
    { id: 2, question: "How can one attain inner peace?" },
    { id: 3, question: "What are the different types of yoga described in the Bhagavad Gita?" },
    { id: 4, question: "What is the significance of karma in life?" },
    { id: 5, question: "How can one achieve spiritual growth?" },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuestions = questions
    .filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aMatchIndex = a.question.toLowerCase().indexOf(searchTerm.toLowerCase());
      const bMatchIndex = b.question.toLowerCase().indexOf(searchTerm.toLowerCase());
      return aMatchIndex - bMatchIndex;
    });

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      <div className="questions-page">
        <Header headerType={"participant"} />
        <div className="question-list-container">
        <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={handleSearch}
            className="questions-s-b"
        />

        <div className="questions">
            {filteredQuestions.map((q) => (
            <div key={q.id} className="question-card">
                <div className="question-header">
                <p>{expandedCard === q.id ? q.question : `${q.question.substring(0, 50)}...`}</p>
                <button className="expand-button" onClick={() => toggleExpand(q.id)}>
                    {expandedCard === q.id ? '▲' : '▼'}
                </button>
                </div>
                {expandedCard === q.id && (
                <div className="question-body">
                    <p>{q.question}</p>
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
