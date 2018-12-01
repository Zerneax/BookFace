export class User {

  private _id: string;
  private _mail: string;
  private _lastName: string;
  private _firstName: string;
  private _birthday: Date;
  private _gender: string;

  set id(id: string) { this._id = id; }
  get id():string { return this._id; }

  set mail(mail: string) { this._mail = mail; }
  get mail():string { return this._mail; }

  set lastName(lastName: string) { this._lastName = lastName; }
  get lastName():string { return this._lastName; }

  set firstName(firstName: string) { this._firstName = firstName; }
  get firstName():string { return this._firstName; }

  set birthday(birthday: Date) { this._birthday = birthday; }
  get birthday():Date { return this._birthday; }

  set gender(gender: string) { this._gender = gender; }
  get gender():string { return this._gender; }
}
