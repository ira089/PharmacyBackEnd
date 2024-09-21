export const emailRegepxp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const phoneRegepxp = /^\+38\d{10}$/;

export const priceRegepxp = /^\d+\.\d{2}$/;

export const quantityRegepxp = /^\d+/;

export const paymentMethodList = ["cash", "bank"];
export const orderStatusList = [
  "Completed",
  "Confirmed",
  "Pending",
  "Cancelled",
  "Processing",
  "Shipped",
  "Delivered",
];
