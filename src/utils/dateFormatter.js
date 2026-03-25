export const dateFormatter = (dateString) => {
  if (!dateString) return "";

  const fecha = new Date(dateString.replace(" ", "T"));

  if (isNaN(fecha)) return "";

  const dia = fecha.toLocaleString("es-MX", { day: "2-digit" });
  const mes = fecha.toLocaleString("es-MX", { month: "short" });
  const anio = fecha.toLocaleString("es-MX", { year: "numeric" });
  const hora = fecha.toLocaleString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1);

  return `${dia} ${mesCapitalizado} ${anio} - ${hora}`;
};
