# botica-seed-node

Template project to facilitate implementing, compiling, and building Botica bots in Javascript using
npm and [botica-lib-node](https://github.com/isa-group/botica-lib-node/).

> [!IMPORTANT]
> **If you plan to use Typescript, not Javascript**, to develop your bot,
> use the [botica-seed-node-ts](https://github.com/isa-group/botica-seed-node-ts/) template.

## Usage

1. [Create a repository based on this template](https://github.com/new?template_name=botica-seed-node&template_owner=isa-group).

2. Make sure you have `node` and `npm` installed in your machine.

3. Modify the `package.json` file, specifically:
    1. The `name` and `author` properties.
    2. The `imageTag` property. The build script will take the tag for the resulting Docker image
       from this property.

4. Run `npm install` in your IDE's terminal.

5. Implement your bot's logic. You can follow one of [these examples](./src/examples).

> [!TIP]
> Full project examples are also available, with their respective Node implementations using
> TypeScript. Check
> out [botica-infrastructure-fishbowl](https://github.com/isa-group/botica-infrastructure-fishbowl).

6. Run the build script. This script builds the Docker image for you based on the `imageTag`
   property in your `package.json`.
    1. For Linux or macOS systems, run `./build.sh` in your IDE's terminal.
    2. For Windows systems, run `build.bat` in your IDE's terminal.
