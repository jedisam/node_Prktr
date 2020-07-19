import axios from 'axios';
import { showAlert } from './alert';

// type is either password or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:7000/api/v1/users/updateMyPassword'
        : 'http://localhost:7000/api/v1/users/updateMe';
    console.log(type);
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', ` ${type.toUpperCase()} Updated Successfully`);
    }
  } catch (err) {
    alert(err);
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
