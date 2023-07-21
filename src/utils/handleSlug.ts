export default function handleSlug(title: string) {
  return title.trim().toLowerCase().replace(/ /g, "-");
}
