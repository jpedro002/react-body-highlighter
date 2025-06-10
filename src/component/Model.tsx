import { memo } from 'react';
import type { KeyboardEvent } from 'react';

import { ModelType, MuscleType } from './metadata';
import type { IModelProps, IMuscleStats, Muscle } from './metadata';

import { anteriorData, posteriorData } from '../assets';
import { DEFAULT_BODY_COLOR, DEFAULT_HIGHLIGHTED_COLORS, DEFAULT_MODEL_TYPE } from '../constants';
import { ensure, fillIntensityColor, fillMuscleData } from '../utils';

/**
 * Component which displays an interactive model of a human body. Accepts many optional props for manipulating functionality or visuals of the component.
 *
 * @param data Array containing exercise objects with muscle targeting data
 * @param bodyColor Default color of body model (with no muscles worked) - defaults to '#B6BDC3'
 * @param highlightedColors Array containing colors to display depending on frequency muscle is worked (where array index = frequency - 1) - defaults to ['#0984e3', '#74b9ff']
 * @param onClick Callback function when a muscle is clicked (returns back object with muscle-related data)
 * @param svgStyle Style object that gets passed to SVG element
 * @param style Style object that gets passed to SVG parent wrapper (div)
 * @param type Denotes type of model view - 'anterior' (front) or 'posterior' (back) - defaults to 'anterior'
 * @param showHands Controls visibility of hands (left and right) - defaults to false
 * @param showFeet Controls visibility of feet (left and right) - defaults to false
 * @param showEars Controls visibility of ears (left and right) - defaults to false
 *
 * @component
 * @example
 * // Basic usage with exercise data
 * const data = [{ name: 'Bench Press', muscles: ['chest', 'triceps', 'front-deltoids'] }]
 * return (
 *   <Model type="posterior" data={data} />
 * )
 *
 * @example
 * // Interactive model with click handling and additional body parts
 * const handleMuscleClick = ({ muscle, data }) => {
 *   console.log(`Clicked ${muscle}:`, data);
 * };
 *
 * return (
 *   <Model
 *     data={workoutData}
 *     onClick={handleMuscleClick}
 *     showHands={true}
 *     showFeet={true}
 *     showEars={true}
 *     bodyColor="#f0f0f0"
 *     highlightedColors={['#ff6b6b', '#feca57']}
 *     style={{ width: '300px', height: '600px' }}
 *   />
 * )
 */
export default memo(function Model({
  data = [],
  bodyColor = DEFAULT_BODY_COLOR,
  highlightedColors = DEFAULT_HIGHLIGHTED_COLORS,
  onClick,
  svgStyle,
  style,
  type = DEFAULT_MODEL_TYPE,
  showHands = false,
  showFeet = false,
  showEars = false,
}: IModelProps) {
  const muscleData = fillMuscleData([...data]);

  const modelData = type === ModelType.ANTERIOR ? anteriorData : posteriorData;

  // Filter data based on visibility props
  const filteredModelData = modelData.filter((exercise) => {
    const muscle = exercise.muscle;

    // Filter hands (now always unilateral)
    if (muscle === MuscleType.LEFT_HAND || muscle === MuscleType.RIGHT_HAND) {
      return showHands;
    }

    // Filter feet (now always unilateral)
    if (muscle === MuscleType.LEFT_FOOT || muscle === MuscleType.RIGHT_FOOT) {
      return showFeet;
    }

    // Filter ears (now always unilateral)
    if (muscle === MuscleType.LEFT_EAR || muscle === MuscleType.RIGHT_EAR) {
      return showEars;
    }

    return true;
  });

  const handleClick = (muscle: Muscle, callback?: (exercise: IMuscleStats) => void) => {
    callback?.({ muscle, data: muscleData[muscle] });
  };

  const handleKeyDown = (event: KeyboardEvent, muscle: Muscle) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(muscle, onClick);
    }
  };

  return (
    <div style={style} className='rbh-wrapper'>
      <svg
        className='rbh'
        width='100%'
        height='100%'
        viewBox='0 0 100 200'
        role='img'
        aria-label='Interactive body muscle diagram'
        style={{
          ...svgStyle,
        }}
      >
        <title>Body muscle diagram for highlighting worked muscles</title>
        {filteredModelData.map((exercise) =>
          exercise.svgPoints.map((points, index) => (
            <polygon
              key={`${exercise.muscle}-${index}`}
              points={points}
              tabIndex={0}
              role='button'
              aria-label={`${exercise.muscle} muscle`}
              onClick={() => handleClick(exercise.muscle, onClick)}
              onKeyDown={(e) => handleKeyDown(e, exercise.muscle)}
              style={{
                cursor: 'pointer',
                fill: ensure(fillIntensityColor(muscleData, highlightedColors, exercise.muscle), bodyColor),
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
});
