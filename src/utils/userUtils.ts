/**
 * Utility to extract user avatar initials from their full name or doctor title.
 * Examples:
 * - "Dr. Jaanvi" -> "DJ"
 * - "Dr. John Doe" -> "JD"
 * - "Mehmood Zadraan" -> "MZ"
 * - "Amina" -> "AM"
 */
export function getUserInitials(name?: string): string {
  if (!name || !name.trim()) return 'MD';

  const clean = name.trim().replace(/[^a-zA-Z0-9\s]/g, '');
  const parts = clean.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return 'MD';

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  // Handle common medical/academic honorifics when 3+ tokens are present
  if (parts.length >= 3 && /^(dr|prof|mr|mrs|ms|doc)$/i.test(parts[0])) {
    return (parts[1][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
