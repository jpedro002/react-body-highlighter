/**
 * React Body Highlighter Example
 *
 * This example demonstrates compatibility with React 18+ and React 19
 * Uses the new createRoot API introduced in React 18
 */
import { StrictMode, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Importa da versão local em desenvolvimento
import Model from '../../src/component/Model';
import type { IMuscleStats, Muscle } from '../../src/component/metadata';
import { ModelType } from '../../src/component/metadata';

function App() {
  // Estado para controlar músculos destacados manualmente
  const [highlightedMuscles, setHighlightedMuscles] = useState<Muscle[]>([]);

  // Estados para controlar a visibilidade das partes
  const [showHands, setShowHands] = useState(true);
  const [showFeet, setShowFeet] = useState(true);
  const [showEars, setShowEars] = useState(true);

  const handleClick = useCallback(({ muscle, data }: IMuscleStats) => {
    console.log(`Clicked muscle: ${muscle}`, data);

    setHighlightedMuscles((prev) => {
      if (prev.includes(muscle)) {
        return prev.filter((m) => m !== muscle);
      }
      return [...prev, muscle];
    });

    const { exercises, frequency } = data;
    console.log(`Muscle ${muscle} toggled! Exercises: ${exercises.join(', ')}, Frequency: ${frequency}`);
  }, []);

  const clearHighlightedMuscles = () => {
    setHighlightedMuscles([]);
  };

  const highlightData = highlightedMuscles.map((muscle) => ({
    name: 'Manual Highlight',
    muscles: [muscle],
    frequency: 1,
  }));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>React Body Highlighter Demo</h1>
        <p>Click on muscles to highlight them!</p>

        <div style={styles.controls}>
          <button type='button' onClick={clearHighlightedMuscles} style={styles.buttonWarning}>
            Clear Selection ({highlightedMuscles.length})
          </button>

          <button
            type='button'
            onClick={() => setShowHands(!showHands)}
            style={showHands ? styles.button : styles.buttonSecondary}
          >
            {showHands ? 'Hide' : 'Show'} Hands
          </button>

          <button
            type='button'
            onClick={() => setShowFeet(!showFeet)}
            style={showFeet ? styles.button : styles.buttonSecondary}
          >
            {showFeet ? 'Hide' : 'Show'} Feet
          </button>

          <button
            type='button'
            onClick={() => setShowEars(!showEars)}
            style={showEars ? styles.button : styles.buttonSecondary}
          >
            {showEars ? 'Hide' : 'Show'} Ears
          </button>
        </div>

        <div style={styles.stats}>
          <strong>Highlighted muscles:</strong> {highlightedMuscles.length}
        </div>
      </div>

      <div style={styles.models}>
        <div style={styles.modelContainer}>
          <h3>Anterior View</h3>
          <Model
            data={highlightData}
            onClick={handleClick}
            bodyColor='#f0f0f0'
            highlightedColors={['#ff5252']}
            style={{ width: '200px', height: '400px' }}
            showHands={showHands}
            showFeet={showFeet}
            showEars={showEars}
            type={ModelType.ANTERIOR}
          />
        </div>

        <div style={styles.modelContainer}>
          <h3>Posterior View</h3>
          <Model
            data={highlightData}
            onClick={handleClick}
            bodyColor='#f0f0f0'
            highlightedColors={['#ff5252']}
            style={{ width: '200px', height: '400px' }}
            showHands={showHands}
            showFeet={showFeet}
            showEars={showEars}
            type={ModelType.POSTERIOR}
          />
        </div>
      </div>

      {/* Section to show selected muscles */}
      {highlightedMuscles.length > 0 && (
        <div style={styles.selectedMuscles}>
          <h3>Selected Muscles ({highlightedMuscles.length})</h3>
          <div style={styles.musclesList}>
            {highlightedMuscles.map((muscle) => (
              <div key={muscle} style={styles.muscleItem}>
                <span style={styles.muscleName}>
                  {muscle.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                <button
                  type='button'
                  onClick={() => setHighlightedMuscles((prev) => prev.filter((m) => m !== muscle))}
                  style={styles.removeButton}
                  title={`Remove ${muscle}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    marginBottom: '1rem',
  },
  stats: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  models: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    flexWrap: 'wrap' as const,
  },
  modelContainer: {
    textAlign: 'center' as const,
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  buttonSecondary: {
    padding: '8px 16px',
    border: '1px solid #4CAF50',
    borderRadius: '4px',
    backgroundColor: 'white',
    color: '#4CAF50',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f8f8f8',
    },
  },
  buttonWarning: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f44336',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#da190b',
    },
  },
  selectedMuscles: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e9ecef',
  },
  musclesList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
    marginTop: '1rem',
  },
  muscleItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '20px',
    padding: '8px 12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  muscleName: {
    fontSize: '14px',
    color: '#495057',
    marginRight: '8px',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#6c757d',
    padding: '0',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#f8f9fa',
      color: '#dc3545',
    },
  },
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
