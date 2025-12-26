// Helper to check if string is a valid date
function isDateString(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(value);
}

// Helper to convert query value to appropriate Prisma filter
function convertQueryValue(key: string, value: any) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === "string" && isDateString(value)) {
    const date = new Date(value);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    return {
      gte: date,
      lt: nextDay,
    };
  }

  if (typeof value === "string") {
    return { contains: value, mode: "insensitive" };
  }

  return value;
}

export function mapQueryToPrismaOptions(query: Record<string, any>) {
  const where: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    const converted = convertQueryValue(key, query[key]);
    if (converted !== undefined) {
      where[key] = converted;
    }
  });
  return { where };
}

export function mapQueryToPrismaOptionsWithPagination(
  query: Record<string, any>,
  page: number,
  limit: number
) {
  const where: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    if (key !== "page" && key !== "limit") {
      const converted = convertQueryValue(key, query[key]);
      if (converted !== undefined) {
        where[key] = converted;
      }
    }
  });
  const skip = (page - 1) * limit;

  return { where, skip, take: limit };
}

export function mapQueryToPrismaOptionsWithOutPagination(
  query: Record<string, any>
) {
  const where: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    if (key !== "page" && key !== "limit") {
      const converted = convertQueryValue(key, query[key]);
      if (converted !== undefined) {
        where[key] = converted;
      }
    }
  });
  return { where };
}
