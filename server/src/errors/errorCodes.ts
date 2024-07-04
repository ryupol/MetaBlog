const errorCodes = {
  BAD_REQUEST: "ER_001",
  UNAUTHORIZED: "ER_002",
  FORBIDDEN: "ER_003",
  VALIDATION_ERROR: "ER_004",
  INTERNAL_SERVER_ERROR: "ER_005",
  UNKNOWN_ERROR: "ER_006",

  // Specific Errors
  USER_NOT_FOUND: "NF_001",
  BLOG_NOT_FOUND: "NF_002",

  // Custom Errors
};

export default errorCodes;
