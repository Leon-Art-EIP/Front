export function appendFormData(formData: FormData, data: Record<string, unknown>) {
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  }
}
