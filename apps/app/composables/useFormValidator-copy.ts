import validators, {
  ValidatorType,
  Fields as FieldsTypes,
  ObjData,
} from "../../../packages/utils/validators";

function isObjData(rule: string | ObjData | ValidatorType): rule is ObjData {
  return typeof rule !== "string" && "isValid" in rule;
}
function isValidatorField(rule: string): rule is FieldsTypes {
  return (
    typeof rule !== "string" &&
    ("email" in rule || "required" in rule || "password" in rule)
  );
}

export function useFormValidator() {
  function allRules(required: boolean, rules: string[]) {
    if (required && !rules.includes("required")) {
      return ["required", ...rules];
    }

    return rules;
  }

  function validate(value: string, rules: Array<FieldsTypes>) {
    const errorMessage = ref("");
    if (!Array.isArray(rules) || rules.length <= 0) return true;
    if (!!value && rules.includes("required")) return true;

    const failedRule = rules.find((rule) => {
      if (validators[rule] == null) {
        return false;
      }

      if (isObjData(rule)) {
        return !rule.isValid;
      }

      if (isValidatorField(rule)) {
        return !!validators[rule](value).isValid;
      }
    });

    if (failedRule) {
      if (isObjData(failedRule)) {
        errorMessage.value = failedRule.errorMessage;
        return failedRule.isValid;
      }
      const failedValidator = validators[failedRule](value);
      errorMessage.value = failedValidator.errorMessage;
    }

    return { isValid: !failedRule, errorMessage: errorMessage.value };
  }

  return { validate, allRules };
}

// exemplo
export function validate(value: string, rule: FieldsTypes): ObjData {
  const findRule = validators[rule](value);
  return findRule;
}
