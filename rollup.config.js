import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
    input: 'src/Petrallengine.ts',
    output: [
        {
            file: 'dist/umd/Petrallengine.js',
            name: 'Petrallengine',
            format: 'umd',
        },
        {
            file: 'dist/esm/Petrallengine.mjs',
            format: 'esm',
        }
    ],
    plugins: [typescript()]
});