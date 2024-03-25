export const getValueOrUndefined = (arg: unknown) =>
  arg === "" || arg === undefined || arg === null ? undefined : arg;
