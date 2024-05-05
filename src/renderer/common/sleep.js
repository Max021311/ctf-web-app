export default async function sleep (millis) {
  await new Promise(resolve => window.setTimeout(resolve, millis))
}
