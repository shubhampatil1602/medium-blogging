export const dateConverter = (publishedOn: string) => {
  const date = new Date(publishedOn);

  // Using toLocaleDateString to format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
};
