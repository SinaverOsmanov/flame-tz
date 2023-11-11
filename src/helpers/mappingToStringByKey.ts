export function mappingToStringByKey<T>(array: T[], key: keyof T): string {
  return array.map((item) => item[key]).join(", ");
}
