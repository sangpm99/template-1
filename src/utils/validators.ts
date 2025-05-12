export const stringLengthValidator = (
  value: string,
  min: number,
  max: number
) => {
  return (
    (value.length >= min && value.length <= max) ||
    `This field must less than ${max} and more than ${min} characters.`
  );
};

export const maxLengthValidator = (value: any, max: number) => {
  if (isEmpty(value)) return true;
  return (
    String(value).length < max || `This field must less than ${max} characters`
  );
};
