module.exports = {
    '*': ['npx nx format', (files) => `npx eslint ${files.join(' ')}`]
};
