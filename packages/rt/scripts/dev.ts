import path from 'path';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import markdown from '@vavt/vite-plugin-import-markdown';

// 默认的导出在import的时候会提示不存在
import nodeServicePlugins from '@md-editor-extension/utils/src/node/vite-plugins/nodeService';
const { nodeService } = nodeServicePlugins;

// vite的兼容
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const resolvePath = (p: string) => path.resolve(__dirname, p);

!(async () => {
  const server = await createServer({
    root: resolvePath('..'),
    configFile: false,
    publicDir: resolvePath('../dev/public'),
    resolve: {
      alias: {
        '@': resolvePath('../dev'),
        '~': resolvePath('../components')
      }
    },
    server: {
      port: 6011
    },
    plugins: [react(), nodeService(), markdown()],
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  });

  await server.listen();

  server.printUrls();
})();
