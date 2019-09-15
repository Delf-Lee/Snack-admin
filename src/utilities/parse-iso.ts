export function parseISO (targetDate: Date) {
  const year = targetDate.getUTCFullYear();
  const month = pad(targetDate.getUTCMonth());
  const date = pad(targetDate.getUTCDate());
  const hours = pad(targetDate.getUTCHours());
  const minutes = pad(targetDate.getUTCMinutes());

  return removeEmptyArea(`
    ${year}-
    ${month}-
    ${date}T
    ${hours}:
    ${minutes}
  `)
}

function removeEmptyArea (targetString: string) {
  return targetString.replace(/(\s*)/g, "");
}

function pad (targetNumber: number): string {
  return targetNumber < 10 ? `0${targetNumber}` : targetNumber.toString();
}
