export default {
  email: (value) => {
    return {
      isValid:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          `${value}`
        ),
      errorMessage: "Insira um email válido.",
    };
  },
  password: (value) => {
    return {
      isValid: /^(?=.*[0-9])(?=.*[!@#$%^&*_+=]).{8,42}$/.test(`${value}`),
      errorMessage:
        "Sua senha deve ter pelo menos 8 caracteres, 1 caractere especial (!@#$%^&*_+=) e 1 letra maiúscula.",
    };
  },
  required: (value) => {
    return {
      isValid: value?.length > 0 || value === true,
      errorMessage: "Esse campo é obrigatório.",
    };
  },
};
