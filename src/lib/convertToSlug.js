export default function convertToSlug(Text) {
  return Text.toLowerCase()
             .replace(/ /g, '-')
             .replace(/[^\w-]+/g, '');
}
