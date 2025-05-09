import reducer, { inputActions } from './SearchSlice';

describe('searchSlice', () => {
  it('should return the initial state', () => {
    const initialState = {
      inputData: { searchdata: null, fliter: null },
    };
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setdata', () => {
    const previousState = {
      inputData: { searchdata: null, fliter: null },
    };

    const newData = {
      searchdata: 'France',
      fliter: 'population',
    };

    expect(reducer(previousState, inputActions.setdata(newData))).toEqual({
      inputData: newData,
    });
  });
});
