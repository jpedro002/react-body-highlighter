import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Model from '../src/index';
import type { IExerciseData } from '../src/index';

describe('Model Component', () => {
  it('renders without crashing', () => {
    const data: IExerciseData[] = [
      { name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] },
      { name: 'Tricep Pushdown', muscles: ['triceps'] },
    ];

    render(
      <Model
        type='posterior'
        data={data}
        highlightedColors={['#e65a5a']}
        onClick={() => console.log('muscle clicked')}
      />
    );

    const svg = screen.getByRole('img', { name: /interactive body muscle diagram/i });
    expect(svg).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<Model />);

    const svg = screen.getByRole('img');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom styling', () => {
    const customStyle = { backgroundColor: 'red' };
    const customSvgStyle = { border: '1px solid black' };

    render(<Model style={customStyle} svgStyle={customSvgStyle} />);

    const wrapper = screen.getByRole('img').parentElement;
    expect(wrapper).toHaveStyle('background-color: red');
  });
});
