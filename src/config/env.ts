import * as dotenv from 'dotenv';
import 'dotenv/config';
import { z } from 'zod';

class EnvValidator {
  private schema: z.ZodObject<any>;

  constructor() {
    this.schema = z.object({
      NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
      PORT: z.string().default('3333'),
    });
  }

  public validate(): { [key: string]: any } {
    const env = dotenv.config().parsed;
    const validatedEnv = this.schema.safeParse(process.env);

    if (!validatedEnv.success) {
      console.error('❌ Invalid environment variables', validatedEnv.error.format());
      throw new Error('Invalid environment variables.');
    }

    const parsedEnv = {
      ...validatedEnv.data,
      PORT: parseInt(validatedEnv.data.PORT, 10),
    };

    return parsedEnv;
  }
}

const envValidator = new EnvValidator();
export const env = envValidator.validate();