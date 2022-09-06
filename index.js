const core = require('@actions/core');
const resources = require("@azure/arm-resources");
const identity = require("@azure/identity");

try {
  const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
  const credential = new identity.DefaultAzureCredential();
  const resourcesClient = new resources.ResourceManagementClient(credential, subscriptionId);

  const name = core.getInput("name", { required: true, trimWhitespace: true }).toUpperCase();
  const location = core.getInput("location", { required: true, trimWhitespace: true }).toLowerCase();

  resourcesClient.resourceGroups.createOrUpdate(
    name,
    {
      location: location
    })
    .then(
      result => {
        const id = result.id;
        const location = result.location;
        const provisioning_state = result.properties.provisioningState;

        core.setSecret(id);

        core.setOutput("id", id);
        core.setOutput("location", location);
        core.setOutput("provisioning_state", provisioning_state);

        core.info(`The resource group ${name} was created successfully.`);
      });
}
catch (error) {
  core.setFailed(error.message);
}