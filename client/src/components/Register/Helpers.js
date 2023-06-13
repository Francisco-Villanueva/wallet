function getPasswordStrength(password) {
  let score = 0;

  // Agregar puntaje por longitud
  if (password.length >= 8) {
    score += 1;
  }
  if (password.length >= 12) {
    score += 2;
  }

  // Agregar puntaje por letras mayúsculas y minúsculas
  if (/[a-z]/.test(password)) {
    score += 1;
  }
  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  // Agregar puntaje por números y caracteres especiales
  if (/\d/.test(password)) {
    score += 1;
  }
  if (/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
    score += 1;
  }
  if (/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
    score += 1;
  }

  const lengthRegex = /.{8,}/;
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;

  // Devolver nivel de seguridad basado en el puntaje
  if (
    lengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    numberRegex.test(password)
  ) {
    if (score < 6) {
      return { strength: "Débil", color: "#d80154" };
    } else if (score < 8) {
      return { strength: "Moderada", color: "#cf661d" };
    } else {
      return { strength: "Fuerte", color: "#0d8655" };
    }
  } else {
    return { strength: "Password strength", color: "#cecece" };
  }
}

export { getPasswordStrength };
