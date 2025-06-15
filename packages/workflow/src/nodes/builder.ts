import { z } from "zod";
import {
  Node,
  NodeMetadata,
  NodeConfig,
  NodeExecutorFunc,
  NodeMemory,
} from "./node";

export interface NodeMetadataBuilder<TBuilder> {
  metadata(metadata: NodeMetadata): TBuilder;
}

export interface NodeMemoryBuilder<TMemorySchema, TBuilder> {
  defaultMemory(memory: NodeMemory<TMemorySchema>): TBuilder;
}

export interface NodeBuilder<TInputSchema, TOutputSchema, TMemorySchema> {
  build(): Node<TInputSchema, TOutputSchema, TMemorySchema>;
}

export interface NodeExecutorBuilder<
  TInputSchema,
  TOutputSchema,
  TMemorySchema,
> {
  executor(
    func: NodeExecutorFunc<TInputSchema, TOutputSchema, TMemorySchema>,
  ): NodeBuilder<TInputSchema, TOutputSchema, TMemorySchema>;
}

export class NodeFactory<TInputSchema, TOutputSchema, TMemorySchema>
  implements NodeExecutorBuilder<TInputSchema, TOutputSchema, TMemorySchema>
{
  protected constructor(
    protected readonly node: NodeConfig<
      TInputSchema,
      TOutputSchema,
      TMemorySchema
    >,
  ) {}

  static create(): NodeMetadataBuilder<NodeFactory<void, void, void>> {
    return {
      metadata(metadata: NodeMetadata) {
        return new NodeFactory({
          metadata,
          output: z.void(),
          input: z.void(),
          memory: z.void(),
          defaultMemory: undefined,
        });
      },
    };
  }

  memory<TMemorySchema>(
    memory: z.ZodType<TMemorySchema>,
  ): NodeMemoryBuilder<
    TMemorySchema,
    NodeFactory<TInputSchema, TOutputSchema, TMemorySchema>
  > {
    const node = this.node;
    return {
      defaultMemory(defaultMemory) {
        return new NodeFactory({
          ...node,
          memory,
          defaultMemory,
        });
      },
    };
  }

  input<TInputSchema>(input: z.ZodType<TInputSchema>) {
    return new NodeFactory({
      ...this.node,
      input,
    });
  }

  output<TOutputSchema>(output: z.ZodType<TOutputSchema>) {
    return new NodeFactory({
      ...this.node,
      output,
    });
  }

  executor(
    func: NodeExecutorFunc<TInputSchema, TOutputSchema, TMemorySchema>,
  ): NodeBuilder<TInputSchema, TOutputSchema, TMemorySchema> {
    const node = this.node;
    return {
      build() {
        return new Node(node, func);
      },
    };
  }
}
