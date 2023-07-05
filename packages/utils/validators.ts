type Fields = "email" | "password" | "required";

type ObjData = {
  isValid: boolean;
  errorMessage: string;
};

type Func = (text: string) => ObjData;

type ValidatorType = Record<Fields, Func>;

const validators: ValidatorType = {
  email: (value: string) => {
    return {
      isValid:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          `${value}`
        ),
      errorMessage: "Insira um email válido.",
    };
  },
  password: (value: string) => {
    return {
      isValid: /^(?=.*\d)(?=.*[!@#$%^&*_+=]).{8,42}$/.test(`${value}`),
      errorMessage:
        "Sua senha deve ter pelo menos 8 caracteres, 1 caractere especial (!@#$%^&*_+=) e 1 letra maiúscula.",
    };
  },
  required: (value: string) => {
    return {
      isValid: value.length > 0,
      errorMessage: "Esse campo é obrigatório.",
    };
  },
};
export default validators;
export { Fields, ObjData, Func, ValidatorType };
