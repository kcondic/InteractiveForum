const textToSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
}

export { textToSlug };