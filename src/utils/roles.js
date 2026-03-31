export const ROLES = {
  1: "Super Administrador",
  2: "Administrador",
  3: "Consultor",
};

// Obtener nombre del rol
export const getRolNombre = (role_id) => {
  return ROLES[Number(role_id)] || "Sin rol";
};

// Validar si tiene un rol específico
export const isRol = (role_id, rolesPermitidos = []) => {
  return rolesPermitidos.includes(Number(role_id));
};

export const tienePermisoMenu = (role_id, permiso) => {
  return PERMISOS_POR_ROL_MENU[Number(role_id)]?.includes(permiso);
};

const PERMISOS_POR_ROL_MENU = {
  1: [1, 2, 4], // SUPER_ADMIN ve todo
  2: [1, 2], // ADMINISTRADOR
  3: [1, 2], // CONSULTOR
};
