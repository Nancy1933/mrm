export default interface IUser {
  id?: any; // Добавлено
  username: string;
  email: string;
  password?: string;
  accessToken?: string; // Добавлено
}