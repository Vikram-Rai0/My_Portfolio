/** Opens absolute URLs and PDFs in a new tab, safely. */
export function linkProps(href = "") {
  const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
