import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { harnessGenerator } from './generator';
import { HarnessGeneratorSchema } from './schema';

describe('harness generator', () => {
    let tree: Tree;
    const options: HarnessGeneratorSchema = { name: 'test' };

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
    });

    it('should run successfully', async () => {
        await harnessGenerator(tree, options);
        const config = readProjectConfiguration(tree, 'test');
        expect(config).toBeDefined();
    });
});
