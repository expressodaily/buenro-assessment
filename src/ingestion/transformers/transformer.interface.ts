export interface Transformer<TInput, TOutput> {
  transform(input: TInput): TOutput;
}
