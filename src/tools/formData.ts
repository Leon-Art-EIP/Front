export function appendFormData<T extends Record<string, unknown>>(data: T) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  return formData;
}
