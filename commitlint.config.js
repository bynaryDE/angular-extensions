async function getConfig() {
    const {
        default: {
            utils: { getProjects }
        }
    } = await import('@commitlint/config-nx-scopes');

    return {
        extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
        rules: {
            'scope-enum': async (ctx) => [2, 'always', [...(await getProjects(ctx)), 'deps']]
        }
    };
}

module.exports = getConfig();
