const results = [
    {
      title: 'WebStreet acquires Onfolio Holdings',
      date: '2024-12-12',
      amount: '$780,000',
    },
    {
      title: 'CHAHAL ENTERPRISES GROUP acquires CHAHAL & CONSORTS',
      date: '2024-09-01',
      amount: 'Undisclosed',
    },
    {
      title: 'Medical Specialists of The Palm Beaches acquires Schlein & Shinder',
      date: '2024-10-07',
      amount: 'Undisclosed',
    },
  ]
  
  const Results = () => {
    return (
      <div className="w-3/4 space-y-4">
        {results.map((result, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{result.title}</h3>
            <p className="text-sm text-gray-500">Date: {result.date}</p>
            <p className="text-sm text-gray-500">Amount: {result.amount}</p>
          </div>
        ))}
      </div>
    )
  }
  
  export default Results
  