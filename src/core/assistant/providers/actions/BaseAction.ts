import { z, ZodSafeParseResult } from 'zod';

export abstract class BaseAssistantAction<TSchema extends z.ZodSchema = z.ZodSchema, R = unknown> {
  abstract name: string;
  abstract description: string;
  abstract parameters: Record<string, string>;
  requiresConfirmation?: boolean = false;

  abstract get parameterSchema(): TSchema;

  abstract execute(params: z.infer<TSchema>): Promise<R>;

  getConfirmationPrompt?(params: z.infer<TSchema>): string;

  /**
   * Get the current schema - works with both static and dynamic getters
   */
  private getCurrentSchema(): TSchema {
    return this.parameterSchema;
  }

  /**
   * Validates and parses parameters using the action's schema
   * Throws ZodError if validation fails
   */
  validateParams(params: unknown): z.infer<TSchema> {
    return this.getCurrentSchema().parse(params);
  }

  /**
   * Safely validates parameters without throwing
   * Returns result with success/error information
   */
  safeValidateParams(params: unknown): ZodSafeParseResult<z.infer<TSchema>> {
    return this.getCurrentSchema().safeParse(params);
  }

  /**
   * Get JSON Schema representation using Zod 4's native conversion
   */
  getJsonSchema() {
    return z.toJSONSchema(this.getCurrentSchema());
  }

  /**
   * Get complete action definition with JSON schema
   */
  getActionDefinition() {
    return {
      name: this.name,
      description: this.description,
      parameters: this.parameters,
      schema: this.getJsonSchema(),
      requiresConfirmation: this.requiresConfirmation || false,
    };
  }
}
