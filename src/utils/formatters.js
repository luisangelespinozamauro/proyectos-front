export const formatNumber = (value) => {
  if (!value && value !== 0) return "";

  return new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const parseNumber = (value) => {
  if (!value) return "";
  return value.replace(/,/g, "");
};
