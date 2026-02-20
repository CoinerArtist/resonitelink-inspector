# ResoniteLink Inspector

An external Resonite inspector using ResoniteLink. Try it yourself here : https://coinerartist.github.io/resonitelink-inspector/

This is made using [ResoniteLinkTS](https://github.com/CoinerArtist/ResoniteLinkTS), my own Typescript wrapper for ResoniteLink.

https://github.com/user-attachments/assets/ed238bfc-7dd6-4146-b619-bbeaca43289b

(`/docs` is actually the build. Github only allows to serve `/` and `/docs` for some reason.)

## Usage

- You need to input the url of a ResoniteLink socket to connect to a session. <br> 
(probably `ws://localhost:PORT` with the port given on the session tab.)

- You can double-click a slot to select it and see its components.

- When you change a field, you have to press enter or unfocus it for the change to be sent.

- The inspector doesn't update on its own, so you can click the name of a slot/component/field to update it.

- The ResoniteLink Info checkbox allows you to see the ResoniteLink id of slots/components/fields. <br>
It also makes clicking on the name of a slot/component/field print its ResoniteLink data in the console. (`CTRL+SHIFT+K` on Firefox)

## Run locally

```bash
pnpm dev
```

I use [pnpm](https://pnpm.io/installation), but you might be able to use another package manager if it supports `jsr:` dependencies in `package.json`.
