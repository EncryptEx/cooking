// Resolves app-relative paths against the directory serving index.html, so it
// works at "/", "/<repo>/" or any other deployment prefix.
function assetPath(relativePath) {
  if (!relativePath) return relativePath;
  const p = String(relativePath).replace(/^\//, '');
  return new URL(p, new URL('./', location.href)).pathname + '';
}
