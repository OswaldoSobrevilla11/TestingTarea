/* Exercise 2: Test using snapshots */

/* Mock the function using jest.fn().
Write three tests inside a describe block. You should use import the superHeros[] and getFlyingSuperHeros function.

1. First Test: 
Test should return an empty array if no superheros have the 'Fly' power"
2. Second Test:
Test should return an array of superHeros that have the 'Fly' power"
3. Third Test:
Test should match the snapshot of flying superheros.
The snapshot file should contain the expected output of the test.
The snapshot should be saved in a __snapshots__ directory next to the test file.
The snapshot file should be named SuperHeros.test.ts.snap.
*/

test("dummy test", () => {
  expect(true).toBe(true);
});


import { superHeros } from "./superHeros"; // Ajusta la ruta
import * as heroUtils from "./getFlyingSuperHeros"; // Para acceder a getFlyingSuperHeros como mock

describe("getFlyingSuperHeros", () => {
  const mockGetFlyingSuperHeros = jest.fn(heroUtils.getFlyingSuperHeros);

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia llamadas previas antes de cada test
  });

  it("should return an empty array if no superheroes have the 'Fly' power", () => {
    const noFlyHeros = [
      { name: "Hulk", power: ["Super Strength", "Regeneration"] },
      { name: "SpiderMan", power: ["Agility", "Spider-Sense"] },
    ];
    const result = mockGetFlyingSuperHeros(noFlyHeros);
    expect(result).toEqual([]);
    expect(mockGetFlyingSuperHeros).toHaveBeenCalledWith(noFlyHeros);
  });

  it("should return an array of superheroes that have the 'Fly' power", () => {
    const result = mockGetFlyingSuperHeros(superHeros);
    const expected = [
      { name: "Superman", power: ["Fly", "Super Strength"] },
      {
        name: "IronMan",
        power: ["Intelligence", "Technology", "Fly", "Billionaire"],
      },
      { name: "GreenLantern", power: ["Energy Manipulation", "Fly"] },
    ];
    expect(result).toEqual(expected);
    expect(mockGetFlyingSuperHeros).toHaveBeenCalledWith(superHeros);
  });

  it("should match the snapshot of flying superheroes", () => {
    const result = mockGetFlyingSuperHeros(superHeros);
    expect(result).toMatchSnapshot();
  });
});