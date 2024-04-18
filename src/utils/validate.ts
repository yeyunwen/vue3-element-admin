export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export const isDef = (val: any): boolean => val !== undefined && val !== null;
