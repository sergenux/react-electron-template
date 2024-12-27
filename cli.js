#! /usr/bin/env node
import { Command } from 'commander'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { createServer } from 'vite'

const app = new Command()

const run = (command) => spawn(command, { shell: true, stdio: 'inherit' })

app.command('dev').action(async () => {
  const server = await createServer()
  await server.listen()
  process.env.DEV_SERVER_URL = server.resolvedUrls?.local.at(0) ?? ''
  run('npx electron-forge start').on('exit', () => {
    process.exit()
  })
})

app.parse()
