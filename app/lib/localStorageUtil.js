const STORAGE_KEY = 'multiStepFormData';
const EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const setFormData = (data) => {
  if (typeof window === 'undefined') return;

  const safeData = { ...data };
  // Remove sensitive payment information
  delete safeData.cardNumber;
  delete safeData.expiryDate;
  delete safeData.cvv;

  const item = {
    value: safeData,
    expiry: new Date().getTime() + EXPIRY_TIME,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
};

export const getFormData = () => {
  if (typeof window === 'undefined') return null;

  const itemStr = localStorage.getItem(STORAGE_KEY);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }

  return item.value;
};