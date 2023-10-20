import { dirname, parse, relative } from 'path';

import { joinPathFragments, stripIndents, Tree } from '@nx/devkit';
import { ensureTypescript } from '@nx/workspace/src/utilities/typescript';

import type { StringLiteral } from 'typescript';

/**
 * Adds an export to a barrel file after the last present export or above all code if
 * no exports are present
 *
 * @param tree - The virtual system file tree
 * @param barrelFilePath - The path to the file to add the export to (from workspace root)
 * @param modulePath - The path to the exported file (from workspace root)
 */
export async function addExportToBarrelFile(tree: Tree, barrelFilePath: string, modulePath: string) {
    const moduleImportPath = getRelativeImportToFile(barrelFilePath, modulePath);

    const updateEntryPointContent = stripIndents`${tree.read(
        barrelFilePath,
        'utf-8'
    )}
    export * from '${moduleImportPath}';`;

    tree.write(barrelFilePath, updateEntryPointContent);
}

/**
 * Checks whether the barrel file already has an export pointing to the modulePath
 *
 * @param tree - The virtual system file tree
 * @param barrelFilePath - The path to the file to add the export to (from workspace root)
 * @param modulePath - The path to the exported file (from workspace root)
 */
export function barrelFileContainsExport(
    tree: Tree,
    barrelFilePath: string,
    modulePath: string
): boolean {
    if (!modulePath) {
        return false;
    }

    ensureTypescript();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { tsquery } = require('@phenomnomnominal/tsquery');
    const moduleImportPath = getRelativeImportToFile(barrelFilePath, modulePath);
    const entryPointContent = tree.read(barrelFilePath, 'utf-8');
    const entryPointAst = tsquery.ast(entryPointContent);
    const moduleExport = tsquery(
        entryPointAst,
        `ExportDeclaration StringLiteral[value='${moduleImportPath}']`,
        { visitAllChildren: true }
    )[0] as StringLiteral;

    return Boolean(moduleExport);
}

/**
 * Returns the relative import path to the target file. This strips any file extension
 *
 * @param sourceFilePath - The path to the file that should contain the import
 * @param targetFilePath - The path to the file that should be imported
 */
export function getRelativeImportToFile(
    sourceFilePath: string,
    targetFilePath: string
): string {
    const relativeDirToTarget = relative(
        dirname(sourceFilePath),
        dirname(targetFilePath)
    );

    return `./${joinPathFragments(
        relativeDirToTarget,
        parse(targetFilePath).name
    )}`;
}
