import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'studio-echelle',
  title: 'Studio Echelle',
  projectId: 'xhaz6bmd',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [],
  },
});
