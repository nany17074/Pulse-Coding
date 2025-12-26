import React, { useState, useEffect } from 'react';
import { Activity, Download, Terminal, RefreshCw, Copy } from 'lucide-react';

const ReviewScraperUI = () => {
  const [commandInput, setCommandInput] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sources, setSources] = useState({
    g2: false,
    capterra: false,
    trustradius: false
  });
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [logs, setLogs] = useState<{ message: string; type: string }[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [pulseData, setPulseData] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // ✅ MERGE CONFLICT RESOLVED — clean data source
  const sampleReviews = [
    { author: "Rahul Mehta", date: "Oct 1, 2024", title: "Smooth onboarding experience and responsive customer support", rating: "positive" },
    { author: "Ananya Sharma", date: "Sep 28, 2024", title: "The interface is clean but performance can be improved", rating: "negative" },
    { author: "Vikram Singh", date: "Oct 1, 2024", title: "Good features overall, especially the analytics dashboard", rating: null },
    { author: "Priya Nair", date: "Oct 1, 2024", title: "Had issues initially but the support team resolved them quickly", rating: "positive" },
    { author: "Arjun Patel", date: null, title: "Frequent loading delays make it difficult to use during peak hours", rating: "negative" },
    { author: "Sneha Kapoor", date: null, title: "Easy to use and well-designed, even for beginners", rating: "positive" },
    { author: "Rohit Verma", date: "Oct 12, 2024", title: "The pricing feels a bit high compared to similar platforms", rating: "negative" },
    { author: "Kavya Iyer", date: "Oct 12, 2024", title: "App works fine but lacks some advanced customization options", rating: "negative" },
    { author: "Aman Gupta", date: "Oct 12, 2024", title: "Reliable performance and consistent updates over time", rating: null },
    { author: "Neha Malhotra", date: "Oct 12, 2024", title: "Excellent user experience with minimal learning curve", rating: "positive" },
    { author: "Saurabh Kulkarni", date: null, title: "Customer service response time needs significant improvement", rating: "negative" },
    { author: "Pooja Choudhary", date: null, title: "Met my expectations for day-to-day usage", rating: "negative" },
    { author: "Aditya Rao", date: null, title: "Feature-rich platform that delivers consistent value", rating: "positive" },
    { author: "Ishita Banerjee", date: "Oct 12, 2024", title: "Very satisfied with the overall experience and reliability", rating: "positive" }
  ];

  useEffect(() => {
    if (!isScrapingActive) return;
    const interval = setInterval(() => {
      setPulseData(prev => [...prev.slice(-40), 30 + Math.random() * 70]);
    }, 100);
    return () => clearInterval(interval);
  }, [isScrapingActive]);

  const addLog = (message: string, type = 'info') => {
    setLogs(prev => [...prev, { message, type }]);
  };

  const handleSourceToggle = (source: keyof typeof sources) => {
    setSources(prev => ({ ...prev, [source]: !prev[source] }));
  };

  const handleInitializeScrape = () => {
    setIsScrapingActive(true);
    setLogs([]);
    setReviewCount(0);
    setShowResults(false);
    setPulseData([]);

    setTimeout(() => addLog('Connecting to sources... Success.', 'success'), 500);
    setTimeout(() => addLog('Parsing review nodes...', 'info'), 1500);
    setTimeout(() => setReviewCount(450), 3000);
    setTimeout(() => {
      setReviewCount(1240);
      setShowResults(true);
      setIsScrapingActive(false);
    }, 6000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1f1f1f', padding: '2rem', color: '#fff' }}>
      <h1>PULSE INSIGHT</h1>

      <button onClick={handleInitializeScrape} disabled={isScrapingActive}>
        Initialize Scrape
      </button>

      {showResults && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {sampleReviews.map((r, i) => (
              <div key={i} style={{ background: '#2d2d2d', padding: '1rem' }}>
                <strong>{r.author}</strong>
                <p>{r.title}</p>
                {r.rating && <span>{r.rating}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={() => window.location.reload()} style={{ marginTop: '2rem' }}>
        <RefreshCw size={16} /> New Search
      </button>
    </div>
  );
};

export default ReviewScraperUI;
