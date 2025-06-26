import { Router } from 'express';
import {
  createRule,
  getAllRules,
  updateRule,
  toggleRuleStatus,
  deleteRule,
} from '../controllers/rules.controller';

const router = Router();

router.post('/api/v1/rules', createRule);
router.get('/api/v1/rules', getAllRules);
router.put('/api/v1/rules/:id', updateRule);
router.patch('/api/v1/rules/:id/status', toggleRuleStatus);
router.delete('/api/v1/rules/:id', deleteRule);

export default router;