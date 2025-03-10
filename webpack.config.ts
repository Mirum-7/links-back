import Dotenv from 'dotenv-webpack';
import path from 'node:path';
import { IgnorePlugin } from 'webpack';

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'production',
  entry: ['./src/main.ts'],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'swc-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new Dotenv(),
    new IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/websockets',
          '@nestjs/websockets/socket-module',
          '@nestjs/microservices/microservices-module',
          'class-transformer/storage',
        ];

        if (!lazyImports.includes(resource)) {
          return false;
        }

        try {
          require.resolve(resource);
          return false;
        } catch (err) {
          return true;
        }
      },
    }),
  ],
  target: 'node',
};

module.exports = config;
