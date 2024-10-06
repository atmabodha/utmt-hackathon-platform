import React, { useState } from 'react';
import '../../utilities/styles/QuestionsPage.css';
import Header from '../../host/components/header/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';


const QuestionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const questions = [
    {
      id: 1,
      title: 'Max Pair sum',
      statement: `Given an array of distinct integers A, find the largest sum of any pair of elements.`,
      input: `
      6 
      1 2 3 89 4 10`,
      output: `99
      and so on. The largest sum out of these pairs is 99.`
    },
    {
      id: 2,
      title: 'Find pair in an array with given sum',
      statement: `Given an array of integers A and an integer S, determines whether there exist two elements in the array whose sum is exactly equal to S.`,
      input: `
      6 
      5 
      1 -2 3 8 7`,
      output: `1`
    },
    {
      id: 3,
      title: 'Largest sum of contiguous sub-array',
      statement: `Given an array of integers A. Find the largest sum of contiguous elements in a sub-array of an array.`,
      input: `
      5 
      -20 -12 42 -10 25`,
      output: `57`
    },
    {
      id: 4,
      title: 'Leaders in an array',
      statement: `Given an array of integers A. Find all the Leaders(An element is a leader if it is greater than all the elements to its right side. The rightmost is always a leader).`,
      input: `
      5 
      9 0 5 6 4 `,
      output: `3`
    },
    {
      id: 5,
      title: 'Rotate an array to left side',
      statement: `Given an array of integers, write a program to rotate the array to the left side K times.`,
      input: `
      10 
      10 20 30 40 50 60 70 80 90 100 `,
      output: `40 50 60 70 80 90 100 10 20 30`
    },
  ];


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredQuestions = questions
  .filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.statement && q.statement.toLowerCase().includes(searchTerm.toLowerCase()))
  )
  .sort((a, b) => {
    const aMatchIndex = a.title.toLowerCase().indexOf(searchTerm.toLowerCase());
    const bMatchIndex = b.title.toLowerCase().indexOf(searchTerm.toLowerCase());
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
          <div className="questions-search-container">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              className="questions-s-b"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          <button className="questions-download-btn">Download</button>
          <div className="questions">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="question-card"
                onClick={() => toggleExpand(q.id)}
              >
                <div className="question-header">
                  <p><strong>{q.title}</strong></p>
                </div>
                <div className={`question-body ${expandedCard === q.id ? 'expanded' : ''}`}>
                  {Object.entries(q).map(([key, value]) => (
                    key !== 'id' && key !== 'title' && (
                      <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong><br />{value}</p>
                    )
                  ))}
                </div>
                <div className="buttons-container">
                  <button className="questions-edit-btn">Edit</button>
                  <button
                    className="read-more-button"
                    onClick={() => toggleExpand(q.id)}
                  >
                    {expandedCard === q.id ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;