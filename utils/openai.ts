export const CleanAndPrepareBaseTranslation = (baseTranslation: string) => {
  if (baseTranslation.startsWith('```json')) {
    baseTranslation = baseTranslation.slice(7);
  }

  if (baseTranslation.endsWith('```')) {
    baseTranslation = baseTranslation.slice(0, -3);
  }

  if (baseTranslation.startsWith('\n')) {
    baseTranslation = baseTranslation.slice(1);
  }

  if (baseTranslation.endsWith('\n')) {
    baseTranslation = baseTranslation.slice(0, -1);
  }

  return baseTranslation;
}