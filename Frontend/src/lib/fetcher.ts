export async function fetcher<T>(fn: () => Promise<T>): Promise<{
  data: T | null;
  error: string | null;
}> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong";
    return { data: null, error: message };
  }
}
