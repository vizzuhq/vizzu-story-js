# Contributing

## Issues

You can find our open issues in the project's
[issue tracker](https://github.com/vizzuhq/vizzu-story-js/issues). Please let us
know if you find any issues or have any feature requests there.

## Contributing

If you want to contribute to the project, your help is very welcome. Just fork
the project, make your changes and send us a pull request. You can find the
detailed description of how to do this in
[Github's guide to contributing to projects](https://docs.github.com/en/get-started/quickstart/contributing-to-projects).

Our [Roadmap page](https://github.com/vizzuhq/.github/wiki/Roadmap) is a
comprehensive list of tasks we want to do in the future. It is a good place to
start if you want to contribute to `Vizzu`. In case you have something else in
mind, that's awesome and we are very interested in hearing about it.

## CI-CD

### Development environment

For contributing to the project, it is recommended to use `Node.js` `18`.
However, for the documentation we are also using `Python`. If you plan to
contribute to this part of the project, you will need `Python`, preferably
version `3.10`.

The following steps demonstrate how to set up the development environment on an
`Ubuntu` `22.04` operating system. However, the process can be adapted for other
operating systems as well.

To start using the `Vizzu-Story` development environment, you need to install
the development dependencies.

```sh
npm install
```

If you want to work with the documantation too, you need to set up the `Python`
development environment.

```sh
python3.10 -m venv ".venv"
source .venv/bin/activate
pip install pdm==2.22.3
pdm install
```

The development requirements are installed based on the `package-lock.json` and
`pdm.lock` files. To update the development requirements, you can use the
command `npm run lock`.

**Note:** For all available `npm` scripts, run `npm run --list`.

For better development practices, you can set up `pre-commit` and `pre-push`
hooks in your local `Git` repository. The `pre-commit` hook will format the code
automatically, and the `pre-push` hook will run the CI steps before pushing your
changes.

```sh
npx husky install
```

**Note:** The provided `pre-commit` and `pre-push` hook configuration file is
tailored for `Ubuntu` `22.04`. If you intend to use another operating system,
you may need to create a custom configuration file suitable for that
environment.

### CI

The CI pipeline includes code formatting checks, code analysis, typing
validation, and unit tests for the `Vizzu-Story` project.

To run the entire CI pipeline, execute the following `npm` script:

```sh
npm run ci
```

However, if you want to run the CI steps on specific parts of the project, you
can use the following scripts: `ci:src`, `ci:docs`, or `ci:tools`.

#### Formatting

You can check the code's formatting using the `format` script:

```sh
npm run format
```

If you need to fix any formatting issues, you can use the `fix-format` script:

```sh
npm run fix-format
```

If you wish to format specific parts of the project, you can use the following
scripts: `format:src`, `format:docs`, `format:tools`, or `fix-format:src`,
`fix-format:docs`, `fix-format:tools`.

#### Code analyses

To perform code analyses, you can use the `lint` script:

```sh
npm run lint
```

If you need to run code analyses for specific parts of the project, you can
utilize the following scripts: `lint:src`, `lint:docs`, or `lint:tools`.

#### Typing

For type checking, you can use the `type` script:

```sh
npm run type
```

If you want to check specific parts of the project, you can use the following
scripts: `type:src` or `type:tools`.

#### Testing

The project is tested using the `jest` testing framework. To run the tests, you
can use the `test` script:

```sh
npm test
```

### Documentation

To build the documentation, you can use the `build-docs` script:

```sh
npm run build-docs
```

You can read the online version at
[vizzu-story.vizzuhq.com](https://vizzu-story.vizzuhq.com/latest/).

### Release

`Vizzu-Story` is distributed on
[npm](https://www.npmjs.com/package/vizzu-story). **Note:** You need to be an
administrator to release the project.

To release `Vizzu-Story`, follow the steps below:

- You should increase the version number in `package.json`. The version bump
  should be in a separated commit.

- Generate the release notes and publish the new release on
  [Releases](https://github.com/vizzuhq/vizzu-story-js/releases).

**Note:** Publishing a new release will automatically trigger the `cd` workflow
which builds and uploads the `Vizzu-Story` package to
[npm](https://www.npmjs.com/package/vizzu-story).

Before making a release, you can build and check the package using the `build`
script:

```sh
npm run build
```
