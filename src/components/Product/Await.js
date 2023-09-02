export default async function Await({ promise, children }) {
  let products = await promise;
  return children(products);
}
