export function delay(milSecond: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milSecond));
}
