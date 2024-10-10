# bun-server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun --hot run index.ts --planId 0
```

In [index](index.ts), there is a list of plans, so you can pass the desired plan id on the command

On [flags](utils/flags/index.ts) file, you can enable or disable a lot of variations of the flow



Recommended extension to avoid cors erros: https://webextension.org/listing/access-control.html

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
