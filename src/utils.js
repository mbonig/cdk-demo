const path = require('path');

const { resolve } = require('path');
const { readdirSync } = require('fs');

function getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files).sort((x, y) => x > y ? -1 : 1);
}

function getRoutes(dir) {
  return (getFiles(dir)).map(file => {

    const pathParts = file.split(path.sep);
    const filename = pathParts[pathParts.length - 1];
    const routePath = file.replace(path.join(__dirname, '..', 'apis'), '').replace(filename, '').replace(path.sep, '/');
    const routePathParts = routePath.split(path.sep).filter(x => !!x);
    const method = routePath === '/' ? 'ANY' : routePathParts[1].toUpperCase();

    return {
      methods: [method],
      path: `/${routePathParts[0] || ''}`,
      entry: file,
    };
  });
}

exports.getFiles = getFiles;
exports.getRoutes = getRoutes;