---
title: Using the CLI
description: Run js-common utilities from your terminal.
sidebar_position: 4
---

The package ships a `js-common` binary that exposes many utilities as commands. Its UI packages are optional peer dependencies, so install them alongside the package first:

```bash
npm install -g @rtorcato/js-common @inquirer/prompts chalk chalk-animation commander figlet gradient-string

js-common --help

js-common date today
js-common math sum 1 2 3 4 5
js-common text capitalize "hello world"
js-common system node-version
```

See [`CLI.md`](https://github.com/rtorcato/js-common/blob/main/CLI.md) in the repository for the full command reference.
