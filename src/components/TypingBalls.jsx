import React from 'react';

const TypingBalls = () => {
  return (
    <>
      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div style={{ margin: '32px' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#2196f3',
              display: 'inline-block',
              margin: '1px',
              borderRadius: '50%',
              animation: `bounce 1s infinite ${i * 0.2}s`
            }}
          ></span>
        ))}
      </div>
    </>
  );
};

export default TypingBalls;
