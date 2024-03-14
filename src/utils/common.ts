const isMobileNumber = (value: any): boolean => {
  const PhoneFormat =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const isMobNum = PhoneFormat.test(value);
  return isMobNum;
};
const isEmailID = (value: any): boolean => {
  const EmailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isEmail = EmailFormat.test(value);
  return isEmail;
};

const handleEnterClick = (event: any, callback: Function) => {
  let keyCharCode = event.keyCode;
  if (event?.key === "Enter") {
    callback();
  }
  if (["e", "E", "+", "-", ".", "Unidentified"]?.includes(event.key)) {
    event.preventDefault();
  }
  if ((keyCharCode >= 48 && keyCharCode <= 57) || keyCharCode == 8) {
    return true;
  } else {
    return false;
  }
};

export { isMobileNumber, isEmailID, handleEnterClick };
