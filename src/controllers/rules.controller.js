export const createRule = async (req, res) => {
    // Placeholder for creating a new rule
    console.log('createRule controller called');
    res.status(201).send({ message: 'Create rule endpoint' });
  };
  
  export const getAllRules = async (req, res) => {
    // Placeholder for getting all rules
    console.log('getAllRules controller called');
    res.status(200).send({ message: 'Get all rules endpoint' });
  };
  
  export const updateRule = async (req, res) => {
    // Placeholder for updating a rule
    console.log('updateRule controller called');
    const { id } = req.params;
    res.status(200).send({ message: `Update rule endpoint for ID: ${id}` });
  };
  
  export const updateRuleStatus = async (req, res) => {
    // Placeholder for updating rule status
    console.log('updateRuleStatus controller called');
    const { id } = req.params;
    res.status(200).send({ message: `Update rule status endpoint for ID: ${id}` });
  };
  
  export const deleteRule = async (req, res) => {
    // Placeholder for deleting a rule
    console.log('deleteRule controller called');
    const { id } = req.params;
    res.status(200).send({ message: `Delete rule endpoint for ID: ${id}` });
  };