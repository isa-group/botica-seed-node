# botica-seed-node

Template project to facilitate implementing, compiling, and building Botica bots in Javascript using
npm and [botica-lib-node](https://github.com/isa-group/botica-lib-node/).

> [!IMPORTANT]
> **If you plan to use Typescript, not Javascript**, to develop your bot,
> use the [botica-seed-node-ts](https://github.com/isa-group/botica-seed-node-ts/) template.

## 1. Initializing the template

You have two main options for setting up your bot project:

### 1.1. As a subdirectory in an existing Botica project (monorepo)

If you want to create this bot as a subdirectory to an existing Botica project
(e.g., alongside your `environment.yml` file), use the Botica Director's `init`
command:

```bash
./botica-director init javascript <your-bot-directory-name>
```

Replace `<your-bot-directory-name>` with the desired folder name for your bot's
project (e.g., `worker-bot`). This command will create the project files
directly in that subdirectory.

### 1.2. As a separate repository

If you want to develop this bot in its own dedicated Git repository, click the
[_Use this
template_](https://github.com/new?template_name=botica-seed-node&template_owner=isa-group)
button on GitHub to create a new repository based on this one.

## 2. Preparing your repository

First, modify the `package.json` file to match your project's details,
specifically the `name` and `author` properties.

Then, install the project's dependencies using `npm`. Make sure you have `node`
and `npm` installed on your machine.

```bash
npm install
```

## 3. Implementing your bot's logic

Your bot's logic begins by calling the asynchronous `botica()` function. This
returns a `Bot` instance that you can use to register listeners (`bot.on()`),
define proactive tasks (`bot.proactive()`), and interact with the Botica
environment. Make you sure you start the bot after configuring it, with `await bot.start()`.

You can follow one of [these examples](./src/examples) for inspiration.

> [!TIP]
> Full project examples are also available, with their respective Node implementations using
> TypeScript. Check
> out [botica-infrastructure-fishbowl](https://github.com/isa-group/botica-infrastructure-fishbowl).

## 4. Building and running

How you run your bot depends on how you set it up in Step 1.

### 4.1. If you initialized it as a subdirectory

The Botica Director can automatically build your bot from the source code
before starting the environment. You do not need to run any manual build
scripts.

In your `environment.yml` file, use the `build` property to point to your bot's
directory:

```yml
bots:
  my-js-bot:
    # The 'build' property tells the Director to build a Docker image from the
    # project located at the specified relative path before running it.
    build: "./worker-bot"
    replicas: 1
    lifecycle:
      type: reactive
```

When you run `./botica-director`, it will detect the `build` property, execute
the build process defined in the project's Dockerfile, and then launch the
container.

### 4.2. If you are using a separate repository

If you are working in a standalone repository, you need to manually build the
Docker image so it is available to your Docker daemon. You can tag it however
you like (e.g., `my-org/my-bot:latest`):

```bash
docker build -t my-org/my-bot:latest .
```

In your `environment.yml` file, use the `image` property to reference the tag
you just created:

```yml
bots:
  my-js-bot:
    # The 'image' property tells the Director to look for an existing
    # Docker image with this tag.
    image: "my-org/my-bot:latest"
    replicas: 1
    lifecycle:
      type: reactive
```
