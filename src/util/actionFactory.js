export function asyncFactory(prefix) {
  const typeSuffixes = [
    'REQUEST',
    'SUCCESS',
    'FAILURE',
  ];

  const types = typeSuffixes.map( suffix => {
    return `${prefix}_${suffix}`;
  });

  return `
    ${types[0]}
    ${types[1]}
    ${types[2]}
  `;
}

export default {
  async: asyncFactory,
};