import { UserObject } from '../dataTypes/UserObject';

const url: string = 'http://localhost:5000/users';

export const getAllUsers = async (): Promise<UserObject[]> => {
  const fetchedUsers: Response = await fetch(url);
  const users: UserObject[] = await fetchedUsers.json();

  return users;
};

export const searchUsers = async (
  email: string,
  phoneNumber: string
): Promise<UserObject[]> => {
  const data: Response = await fetch(
    url + '?email=' + email + '&phoneNumber=' + phoneNumber
  );
  const users: UserObject[] = await data.json();

  return users;
};

export const getUserForDetails = async (
  id: string | undefined
): Promise<UserObject> => {
  const fetchedUser: Response = await fetch(url + '/' + id);
  const user: UserObject = await fetchedUser.json();

  return user;
};

export const getUserDetailsForUpdate = async (
  id: string | undefined
): Promise<UserObject> => {
  const fetchedUser: Response = await fetch(url + '/' + id);
  const user: UserObject = await fetchedUser.json();

  return user;
};

export const getDetailsForUpdateUser = (
  id: string | undefined,
  name: string,
  lastName: string,
  email: string,
  phoneNumberType: string,
  phoneNumberValue: string
): void => {
  fetch(url + '/' + id, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      firstName: name,
      lastName: lastName,
      email: email,
      phoneNumberType: phoneNumberType,
      value: phoneNumberValue,
    }),
  });
};

export const deleteUser = async (id: string | undefined): Promise<void> => {
  await fetch(url + '/' + id, {
    method: 'DELETE',
  });
};

export const saveUser = (
  name: string,
  lastName: string,
  email: string,
  phoneNumberType: string,
  phoneNumberValue: string
): void => {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      firstName: name,
      lastName: lastName,
      email: email,
      phoneNumberType: phoneNumberType,
      value: phoneNumberValue,
    }),
  });
};

export const chechIfEmailExists = async (email: string): Promise<boolean> => {
  const emailExists: Response = await fetch(
    url + '/email/' + email
  );
  const ifExist: boolean = await emailExists.json();
  return ifExist;
}