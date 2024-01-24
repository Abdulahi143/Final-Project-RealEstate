// DescriptionValidation.ts

interface ValidationResponse {
  isValid: boolean;
  message?: string;
}

export const validateWordCount = (value: string): ValidationResponse => {
  const wordCount = value.trim().split(/\s+/).length;
  const minWordCount = 20;

  if (wordCount < minWordCount) {
    return {
      isValid: false,
      message: `Please enter at least ${minWordCount} words.`,
    };
  }

  return {
    isValid: true,
  };
};
