/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  console.log('Heyyyyy');
  console.log('Update ', type);
  try {
    const url =
      type === 'password'
        ? 'http://localhost:7000/api/v1/users/updateMyPassword'
        : 'http://localhost:7000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      console.log('Updated');
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    console.log('err', err.response);
    showAlert('error', err.response.data.message);
  }
};
