export const asyncHandler = async <T>(
    fn: () => T | Promise<T>
  ): Promise<[T | null, Error | null]> => {
    try {
      const data = await fn();
      return [data, null];
    } catch (error) {
      return [null, error as Error];
    }
  };
  