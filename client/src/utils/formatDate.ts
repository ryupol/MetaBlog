function formatDate(isoDate: string | undefined): string {
  if (!isoDate) return "Unknown date";

  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default formatDate;
