interface ResponseObj {
  isValid: boolean;
  message: string;
}

export function validateString(string: string, maxLength: number) {
  const responseObj = {
    isValid: false,
    message: "no-char",
  };

  // 1. Check if there is any content
  const isChar = /\S/.test(string) ? true : false;

  if (!isChar) {
    return responseObj;
  }

  // 2. Check if content is less than maxLength
  const isRightLength = string.length <= maxLength;
  if (!isRightLength) {
    responseObj.message = "to-long";
    return responseObj;
  }

  responseObj.isValid = true;
  responseObj.message = "";
  return responseObj;
}
