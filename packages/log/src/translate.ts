import path from 'path';
import { createTranslator } from '@boost/translate';

export const msg = createTranslator('log', path.join(path.dirname(import.meta.url), '../res'));
