import GridLabel from './components/label';
import SquareGrid from './components/square_grid';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg)', 
      gap: '20px'
    }}>
      <GridLabel text='IR Camera Map' />
      <SquareGrid />
    </div>
  );
}

export default App;