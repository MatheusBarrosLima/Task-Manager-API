import { optional, string, z } from "zod";

export const paginationSchema = z
  .object({
    limit: z
      .string({
        required_error: "limit is required!",
        invalid_type_error: "limit must be a string!",
      })
      .max(255, "max limit length exceeded!")
      .regex(/^\d+$/, "limit must have only numbers")
      .optional(),

      offset: z
      .string({
        required_error: "offset is required!",
        invalid_type_error: "offset must be a string!",
      })
      .max(255, "max offset length exceeded!")
      .regex(/^\d+$/, "offset must have only numbers")
      .optional(),

    filter: z
    .enum(["completed", "pending", "all"],{
      required_error: "filter is required!",
      invalid_type_error: "filter must be 'completed' or 'pending' or 'all'!",
    }),
  })
  .strict();

  export type PaginationDataTypes = z.infer<typeof paginationSchema>