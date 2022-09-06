# GitHub Action Create Resource Group
```yml
name: Create Resource Group GitHub Action Example
on:
  push:
    branches:
      - $default-branch
jobs:
  provision:
    runs-on: ubuntu-latest
    env:
      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
      AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
      AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
    steps:
    - name: Create Resource Group
      uses: sn-cscharf/GitHubAction.CreateResourceGroup@v1.0.0
      with:
        name: ${{ github.ref_name }}
        location: westeurope
```

# Inputs
## Environment Variables
Obtain following environment variables by following this link: [Authenticate to Azure using environment variables](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/resourcemanager/Azure.ResourceManager/docs/AuthUsingEnvironmentVariables.md)

Name | Required
:-   | :-:
AZURE_CLIENT_ID | Yes
AZURE_CLIENT_SECRET | Yes
AZURE_TENANT_ID | Yes
AZURE_SUBSCRIPTION_ID | Yes

Please register secrets named accordingly to use in env element:
```yml
env:
  AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
  AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
  AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
  AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```
## Step Variables

Name | Required | Description
:-   | :-: | :-
name | Yes | The name of the resource group to create e.g. APPNAME-RESOURCE-STAGING.
location | Yes | The location of the resource group to create e.g. westeurope, westus.

Use in with element:
```yml
with:
  name: APP-GROUP-DEV
  location: westeurope
```

# Outputs
## Step Variables
Name | As Secret | Description
:-   | :-: | :-
id | Yes | The id of the created resource group.
location | No | The location of the created resource group.
provisioning_state | No | The provisioning state result of the created resource group.

Use in following steps:
```yml
steps:
- name: Create Resource Group
  id: step_one
  uses: sn-cscharf/GitHubAction.CreateResourceGroup@v1.0.0
  with:
    name: APP-GROUP-DEV
    location: westeurope
- name: Echo Results
  run: |
    echo "The id is ${{ steps.step_one.outputs.id }}"
    echo "The location is ${{ steps.step_one.outputs.location }}"
    echo "The provisioning state is ${{ steps.step_one.outputs.provisioning_state }}"
```