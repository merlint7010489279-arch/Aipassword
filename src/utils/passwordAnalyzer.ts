interface PasswordCheck {
  passed: boolean;
  message: string;
}

interface PasswordAnalysis {
  strength: 'weak' | 'fair' | 'good' | 'strong' | 'very strong';
  checks: PasswordCheck[];
  suggestions: string[];
  score: number;
}

export function analyzePassword(password: string): PasswordAnalysis {
  const checks: PasswordCheck[] = [];
  const suggestions: string[] = [];
  let score = 0;

  const hasMinLength = password.length >= 8;
  checks.push({
    passed: hasMinLength,
    message: hasMinLength
      ? 'Contains at least 8 characters'
      : 'Must be at least 8 characters long'
  });
  if (hasMinLength) score += 20;
  else suggestions.push('Use at least 8 characters');

  const hasUppercase = /[A-Z]/.test(password);
  checks.push({
    passed: hasUppercase,
    message: hasUppercase
      ? 'Contains uppercase letters'
      : 'Should contain uppercase letters (A-Z)'
  });
  if (hasUppercase) score += 20;
  else suggestions.push('Add uppercase letters');

  const hasLowercase = /[a-z]/.test(password);
  checks.push({
    passed: hasLowercase,
    message: hasLowercase
      ? 'Contains lowercase letters'
      : 'Should contain lowercase letters (a-z)'
  });
  if (hasLowercase) score += 20;
  else suggestions.push('Add lowercase letters');

  const hasNumber = /[0-9]/.test(password);
  checks.push({
    passed: hasNumber,
    message: hasNumber
      ? 'Contains numbers'
      : 'Should contain numbers (0-9)'
  });
  if (hasNumber) score += 20;
  else suggestions.push('Add numbers');

  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  checks.push({
    passed: hasSpecial,
    message: hasSpecial
      ? 'Contains special characters'
      : 'Should contain special characters (!@#$%^&*)'
  });
  if (hasSpecial) score += 20;
  else suggestions.push('Add special characters like !@#$%^&*');

  if (password.length >= 12) {
    score += 10;
  } else if (password.length >= 10) {
    score += 5;
  }

  if (password.length < 12) {
    suggestions.push('Use 12 or more characters for better security');
  }

  const hasSequence = /(?:abc|bcd|cde|def|123|234|345|456|567|678|789)/i.test(password);
  if (hasSequence) {
    score -= 10;
    suggestions.push('Avoid sequential characters like "abc" or "123"');
  }

  const hasRepeat = /(.)\1{2,}/.test(password);
  if (hasRepeat) {
    score -= 10;
    suggestions.push('Avoid repeating characters like "aaa" or "111"');
  }

  const commonPasswords = ['password', 'qwerty', 'admin', 'letmein', 'welcome', '123456'];
  const isCommon = commonPasswords.some(common =>
    password.toLowerCase().includes(common)
  );
  if (isCommon) {
    score -= 20;
    suggestions.push('Avoid common words and phrases');
  }

  let strength: 'weak' | 'fair' | 'good' | 'strong' | 'very strong';
  if (score < 40) strength = 'weak';
  else if (score < 60) strength = 'fair';
  else if (score < 80) strength = 'good';
  else if (score < 95) strength = 'strong';
  else strength = 'very strong';

  return {
    strength,
    checks,
    suggestions,
    score
  };
}
