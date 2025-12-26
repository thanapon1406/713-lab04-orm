export function mapQueryToPrismaOptions(query: Record<string, any>) {
  const where: Record<string, any> = {};
  Object.keys(query).forEach((key) => {
    if (query[key] !== undefined) {
      where[key] =
        typeof query[key] === "string"
          ? { contains: query[key], mode: "insensitive" }
          : query[key];
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
    if (query[key] !== undefined && key !== "page" && key !== "limit") {
      where[key] =
        typeof query[key] === "string"
          ? { contains: query[key], mode: "insensitive" }
          : query[key];
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
    if (query[key] !== undefined && key !== "page" && key !== "limit") {
      where[key] =
        typeof query[key] === "string"
          ? { contains: query[key], mode: "insensitive" }
          : query[key];
    }
  });
  return { where };
}
