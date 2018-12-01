export class User {

  private _id: string;
  private _mail: string;
  private _password: string;
  private _lastName: string;
  private _firstName: string;
  private _birthday: Date;
  private _gender: string;

  set id(id: string) { this._id = id; }
  get id():string { return this._id; }

  set mail(mail: string) { this._mail = mail; }
  get mail():string { return this._mail; }

  set password(password: string) { this._password = password; }
  get password():string { return this._password; }

  set lastName(lastName: string) { this._lastName = lastName; }
  get lastName():string { return this._lastName; }

  set firstName(firstName: string) { this._firstName = firstName; }
  get firstName():string { return this._firstName; }

  set birthday(birthday: Date) { this._birthday = birthday; }
  get birthday():Date { return this._birthday; }

  set gender(gender: string) { this._gender = gender; }
  get gender():string { return this._gender; }

  toJson() {
    const userJson = {} as any;
    userJson.mail = this._mail;
    userJson.password = this._password;
    userJson.lastName = this._lastName;
    userJson.firstName = this._firstName;
    userJson.birthday = this._birthday;
    userJson.gender = this._gender;

    return userJson;
  }
}
