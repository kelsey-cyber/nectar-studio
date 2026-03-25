import React, { useRef } from 'react';

const VisualGenerator = () => {
  const canvasRef = useRef(null);
  
  const generateVisual = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Nectar Life brand colors
    const colors = {
      primary: '#FCAFC0',
      hot: '#F05380', 
      cream: '#FCF4EE',
      charcoal: '#434343'
    };
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.cream);
    gradient.addColorStop(1, colors.primary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Title text
    ctx.fillStyle = colors.hot;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('CELEBRATE MOM', 50, 150);
    
    // Subtitle
    ctx.fillStyle = colors.charcoal;
    ctx.font = '24px Arial';
    ctx.fillText('Luxurious self-care she deserves', 50, 200);
    
    // Call to action
    ctx.fillStyle = colors.hot;
    ctx.font = 'bold 20px Arial';
    ctx.fillText('SHOP MOTHER\'S DAY COLLECTION', 50, 250);
    
    // Product placeholder
    ctx.fillStyle = colors.hot;
    ctx.fillRect(400, 50, 200, 200);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PRODUCT IMAGE', 500, 150);
  };
  
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'nectar-life-visual.png';
    link.href = canvas.toDataURL();
    link.click();
  };
  
  return (
    <div style={{ padding: '20px', background: '#FCF4EE', borderRadius: '10px', margin: '20px 0' }}>
      <h3 style={{ color: '#F05380', margin: '0 0 20px 0' }}>🎨 Visual Generator</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={generateVisual}
          style={{
            background: 'linear-gradient(135deg, #F05380, #FCAFC0)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Generate Visual
        </button>
        
        <button 
          onClick={downloadImage}
          style={{
            background: '#434343',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          💾 Download
        </button>
      </div>
      
      <canvas 
        ref={canvasRef}
        width="600"
        height="300"
        style={{
          border: '2px solid #F05380',
          borderRadius: '8px',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
};

export default VisualGenerator;