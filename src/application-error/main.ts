export type ApplicationError = {
  code: 400 | 401 | 404 | 500;
  message: string;
} | null;

export const newApplicationError = (
  code: 400 | 401 | 404 | 500,
  message: string
): ApplicationError => {
  const ae: ApplicationError = {
    code: code,
    message: message,
  };

  return ae;
};
