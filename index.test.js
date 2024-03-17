const {keyFromValue, planetColour, spaceship, constellations} = require('./index')

test('inputted value displays correct key', () => {
  expect(keyFromValue(planetColour,"red")).toBe('mars');
  expect(keyFromValue(spaceship,2)).toBe('Gemini 4');
  expect(keyFromValue(constellations,4)).toBe(undefined);
  expect(keyFromValue('','')).toBe(undefined);
})