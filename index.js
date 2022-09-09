const core = require('@actions/core');
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");

async function createResourceGroup() {
  try {
    const name = core.getInput("name", { required: true, trimWhitespace: true }).toUpperCase();
    const location = core.getInput("location", { required: true, trimWhitespace: true }).toLowerCase();

    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
    const credential = new identity.DefaultAzureCredential();
    const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);

    const exists = (await resourcesClient.resourceGroups.checkExistence(name)).body;

    const resourceGroup = await resourcesClient.resourceGroups.createOrUpdate(name,
      {
        location: location
      });

    core.setSecret(resourceGroup.id);

    core.setOutput("id", resourceGroup.id);
    core.setOutput("location", resourceGroup.location);
    core.setOutput("provisioning_state", resourceGroup.properties.provisioningState);

    core.info(`The resource group ${name} was ${exists ? 'updated' : 'created'} successfully.`);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

createResourceGroup();