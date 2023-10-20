import * as path from 'path';

import { formatFiles, generateFiles, joinPathFragments, Tree } from '@nx/devkit';
import { defaults } from 'lodash';

import { addExportToBarrelFile, barrelFileContainsExport, getRelativeImportToFile } from '../../utils';

import { Barrel } from './schema';

const DEFAULT_SCHEMA: Partial<Barrel> = {
    name: 'index'
};

/**
 * This helper-generator adds a given export to a file named public-api.ts next to it.
 * If the public-api file does not exist, it will be created.
 *
 * @param tree
 * @param schema
 */
export async function barrelFileGenerator(tree: Tree, schema: Barrel) {
    schema = defaults({}, schema, DEFAULT_SCHEMA);

    const { path: currentDir, file: filePath, export: exportPath, name } = schema;
    const filePathFromRoot = joinPathFragments(currentDir, filePath);
    const parsedFilePath = path.parse(filePathFromRoot);

    if (!exportPath && !parsedFilePath.ext) {
        throw new Error('No file specified in path');
    }

    const barrelFilePath = path.join(currentDir, `${name}.ts`);

    if (!tree.exists(barrelFilePath)) {
        const substitutions = {
            exportFilePath: exportPath ?? getRelativeImportToFile(barrelFilePath, filePathFromRoot),
            name
        };

        generateFiles(tree, joinPathFragments(__dirname, 'files'), parsedFilePath.dir, substitutions);
    } else {
        if (barrelFileContainsExport(tree, barrelFilePath, filePathFromRoot)) {
            return;
        }

        await addExportToBarrelFile(tree, barrelFilePath, filePathFromRoot);
    }

    await formatFiles(tree);
}

export default barrelFileGenerator;
