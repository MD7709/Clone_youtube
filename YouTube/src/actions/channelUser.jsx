import * as api from '../api';

export const updateChannelData = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateChannelData(id, updateData);
    dispatch({ type: 'UPDATE_DATA', payload: data });
  } catch (error) {
    console.log(error);
  }
};
