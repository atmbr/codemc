
export const levenshteinDistance = (a, b) => {
  if (!a || !b) return (a || b || '').length;
  const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  for (let i = 0; i <= a.length; i += 1) matrix[0][i] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[j][0] = j;
  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator,
      );
    }
  }
  return matrix[b.length][a.length];
};

export const findClosestCommand = (typedCommand, commandsList) => {
  if (!typedCommand) return null;
  let closestCommand = null;
  let minDistance = Infinity;

  commandsList.forEach(command => {
    const distance = levenshteinDistance(typedCommand.toLowerCase(), command.name.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closestCommand = command.name;
    }
  });
  // Consider a match if distance is 2 or less, and it's not the exact same command (unless case is different)
  return (minDistance <= 2 && closestCommand.toLowerCase() !== typedCommand.toLowerCase()) ? closestCommand : null;
};
