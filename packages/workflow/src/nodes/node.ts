import z from "zod";

export type NodeMetadata = {
  name: string;
  description: string;
  icon: string;
};

export type NodeMemory<TMemorySchema> = z.infer<z.ZodType<TMemorySchema>>;

export type NodeConfig<TInputSchema, TOutputSchema, TMemorySchema> = {
  input: z.ZodType<TInputSchema>;
  output: z.ZodType<TOutputSchema>;
  memory: z.ZodType<TMemorySchema>;
  defaultMemory: NodeMemory<TMemorySchema>;
  metadata: NodeMetadata;
};

export type NodeExecutorInput<TInputSchema> = z.infer<z.ZodType<TInputSchema>>;

export type NodeExecutorOutput<TOutputSchema> = z.infer<
  z.ZodType<TOutputSchema>
>;

export type NodeExecutorFunc<TInputSchema, TOutputSchema, TMemorySchema> = (
  node: Node<TInputSchema, TOutputSchema, TMemorySchema>,
  input: NodeExecutorInput<TInputSchema>,
) => Promise<NodeExecutorOutput<TOutputSchema>>;

export class Node<TInputSchema, TOutputSchema, TMemorySchema> {
  private memory: NodeMemory<TMemorySchema>;

  constructor(
    public readonly config: NodeConfig<
      TInputSchema,
      TOutputSchema,
      TMemorySchema
    >,
    private readonly executor: NodeExecutorFunc<
      TInputSchema,
      TOutputSchema,
      TMemorySchema
    >,
  ) {
    this.memory = config.defaultMemory;
  }

  getMemory(): NodeMemory<TMemorySchema> {
    return this.memory;
  }

  setMemory(memory: NodeMemory<TMemorySchema>) {
    return (this.memory = this.config.memory.parse(memory));
  }

  execute(input: NodeExecutorInput<TInputSchema>) {
    return this.executor(this, this.config.input.parse(input));
  }
}
