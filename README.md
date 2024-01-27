# create-env-file action
Github Action to write Github Secrets into a .env file. The action looks for variables that start with `INPUT_ENV_` and creates a .env file with them.

## Inputs

### key
**Required** Should start with `ENV_` prefix

### value
**Required** Should be in the format specified in Github's [documentation](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets#using-encrypted-secrets-in-a-workflow)
 
### file-name
**Optional** The name of the file to be written. Default  `.env`

## Usage
1. Add it as a new step to your job.
2. Add a key/value in `with:` section.
3. Go to your `repository -> settings -> secrets` and add secrets you want to be written into a .env file.

## Example usage
```yaml
on:
  push:
    branches:
      - master
jobs: 
  create_env_file_job:
    runs-on: ubuntu-latest
    steps:
      - name: Create .env file
        uses: ozaytsev86/create-env-file@v1
        with:
          ENV_TEST_API_KEY: ${{ secrets.TEST_API_KEY }}
          ENV_ANOTHER_KEY: ${{ secrets.ANOTHER_KEY }}
```
**NOTE:** be sure that `ubuntu-latest` or any other image you use has node installed.
## Result .env
```text
TEST_API_KEY=1234test
ANOTHER_KEY=Super secret
```

## License

This project released under the [MIT License](LICENSE).
