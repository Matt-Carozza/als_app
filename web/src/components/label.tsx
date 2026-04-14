const GridLabel = ({ text = "STATUS: ACTIVE" }) => {
  const labelStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    border: '1px solid var(--accent)', 
    backgroundColor: 'var(--accent-bg)',
    color: 'var(--accent)',
    fontFamily: 'var(--mono)',
    fontSize: '25px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 10px rgba(8, 235, 0, 0.2)', 
    marginBottom: '10px'
  };

  return <div style={labelStyle}>{text}</div>;
};

export default GridLabel;