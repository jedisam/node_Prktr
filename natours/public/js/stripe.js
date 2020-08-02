/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51HAaK4FoQBS8aejMfhu7tog4u9oDWOYGzmlDKbvmHwLV4DxfASFuMyvD32zwsFxoLjoyPsR231H2FEYL7nWc218d00mnAtVVOU'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from the server
    const session = await axios(
      `http://localhost:7000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create Checkout form + charge credit Card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
