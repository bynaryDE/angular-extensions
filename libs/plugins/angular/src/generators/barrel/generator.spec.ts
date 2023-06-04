import { addProjectConfiguration, joinPathFragments, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import generator from './generator';

/**
 * Testing not configured for nx
 */
describe('barrel-file generator', () => {
    let appTree: Tree;

    beforeEach(() => {
        appTree = createTreeWithEmptyWorkspace();

        addProjectConfiguration(appTree, 'test', {
            projectType: 'library',
            sourceRoot: 'libs/test/src',
            root: 'libs/test'
        });
    });

    it.each<string | jest.DoneCallback>([ '', null, undefined,
                                          'random/path/withoutFileExt' ])('should throw an error', (path: string, done: jest.DoneCallback) => {
        generator(appTree, { path }).catch(() => done());
    });

    describe.each([ [ 'libs/test/src' ], [ 'src' ], [ '' ] ])('--path', (basePath) => {
        const FILE_NAME = 'testing.ts';
        const BARREL_FILE_NAME = 'index.ts';

        beforeEach(async () => {
            await generator(appTree, { path: joinPathFragments(basePath, FILE_NAME) });
        });

        it('creates an index.ts', () => {
            expect(appTree.exists(joinPathFragments(basePath, BARREL_FILE_NAME))).toBeTruthy();
        });

        it('should export the file from the path in the index.ts', () => {
            const publicApiFile = appTree.read(joinPathFragments(basePath, BARREL_FILE_NAME)).toString();

            expect(publicApiFile).toContain(`export * from './${FILE_NAME}'`);
        });

        it('adds another export to the existing index.ts', async () => {
            const secondFileName = 'anotherOne.ts';

            await generator(appTree, { path: joinPathFragments(basePath, secondFileName) });

            const publicApiFile = appTree.read(joinPathFragments(basePath, BARREL_FILE_NAME)).toString();

            expect(publicApiFile).toContain(`export * from './${FILE_NAME}'`);
            expect(publicApiFile).toContain(`export * from './${secondFileName}'`);
        });
    });

    describe.each([
        [ 'libs/test/src', '/testExport.ts' ],
        [ 'src', 'anyText' ],
        [ '', '' ]
    ])('--export', (basePath, exportPath) => {
        const FILE_NAME = 'testing.ts';
        const BARREL_FILE_NAME = 'index.ts';

        beforeEach(async () => {
            await generator(appTree, { path: joinPathFragments(basePath, FILE_NAME), export: exportPath });
        });

        it('creates an index.ts', () => {
            expect(appTree.exists(joinPathFragments(basePath, BARREL_FILE_NAME))).toBeTruthy();
        });

        it('should export the string from the export argument in the index.ts', () => {
            const publicApiFile = appTree.read(joinPathFragments(basePath, BARREL_FILE_NAME)).toString();

            expect(publicApiFile).toContain(`export * from '${exportPath}'`);
        });

        it('adds another export to the existing index.ts', async () => {
            const secondExportPath = 'anotherOne.ts';

            await generator(appTree, { path: joinPathFragments(basePath, 'anotherOne.ts'), export: secondExportPath });

            const publicApiFile = appTree.read(joinPathFragments(basePath, BARREL_FILE_NAME)).toString();

            expect(publicApiFile).toContain(`export * from '${exportPath}'`);
            expect(publicApiFile).toContain(`export * from '${secondExportPath}'`);
        });
    });

    describe.each([ 'public-api', 'public_api', 'my-barrel' ])('--name', (name) => {
        const basePath = 'libs/test/src';
        const FILE_NAME = 'testing.ts';

        beforeEach(async () => {
            await generator(appTree, { path: joinPathFragments(basePath, FILE_NAME), name });
        });

        it('creates a correctly named barrel file', () => {
            expect(appTree.exists(joinPathFragments(basePath, `${name}.ts`))).toBeTruthy();
        });
    });
});
