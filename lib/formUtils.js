export const handleFormSubmit = async (
  formAction,
  values,
  setError,
  setSuccess,
  form
) => {
  setError("");
  setSuccess("");

  try {
    const data = await formAction(values);
    if (data?.error) {
      setError(data.error);
    }
    if (data?.success) {
      form?.reset();
      setSuccess(data.success);
    }
  } catch (error) {
    console.log(error);
    setError("An unexpected error occurred. Please try again.");
  }
};
