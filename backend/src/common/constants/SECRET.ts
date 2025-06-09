import jetEnv, { str } from 'jet-env';
import { isEnumVal } from 'jet-validators';

import { SecretEnvs } from '.';


/******************************************************************************
                                 Setup
******************************************************************************/

const SECRETENV = jetEnv({
  SecretEnv: isEnumVal(SecretEnvs),
  MongodbUri: str,
  GeminiKey: str,
});


/******************************************************************************
                            Export default
******************************************************************************/

export default SECRETENV;
