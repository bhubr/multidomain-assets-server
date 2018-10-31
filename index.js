const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
projectsRootMap = {
  deadcandy: '../bonbondexHackaton/bonbondex',
  candyrobbers: '../candy-robbers',
  hallowin: '../AlloWin/quizzhalloween',
  sweedex: '../candydex'
};
const buildDirMap = Object.keys(projectsRootMap).reduce(
  (carry, subdomain) => ({...carry, [subdomain]: path.resolve(__dirname,`${projectsRootMap[subdomain]}/build`) }),
  {}
);

/*Object.values(buildDirMap)
.forEach(buildDir => {
  console.log(buildDir);
  app.use(express.static(buildDir));
});*/

app.get('*', (req, res) => {
  const [subdomain] = req.hostname.split('.');
  const domainPublic = buildDirMap[subdomain];
  const filePath = `${domainPublic}${req.url}`;
  console.log('accessing', filePath);
  fs.access(filePath, fs.constants.F_OK, err => {
    if(err) {
console.log('send index', `${domainPublic}/index.html`);
      return res.sendFile(`${domainPublic}/index.html`);
    }
console.log('found', filePath);
    return res.sendFile(filePath);
  });
});

app.listen(process.env.PORT || 5020);

