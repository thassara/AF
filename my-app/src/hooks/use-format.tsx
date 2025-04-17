export function useFormat() {
  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatTitleCase = (value: string) => {
    return value
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Convert camelCase to spaced words
      .replace(/_/g, " ") // Convert snake_case to spaced words
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  return { formatCurrency, formatNumber, formatTitleCase };
}
