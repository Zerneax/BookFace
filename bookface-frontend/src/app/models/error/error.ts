export class ErrorMessage {

  private _header: string;
  private _information: string;
  private _display: boolean;


  set header(header: string) { this._header = header; }
  get header():string { return this._header; }

  set information(information: string) { this._information = information; }
  get information():string { return this._information; }

  set display(display: boolean) { this._display = display; }
  get display():boolean { return this._display; }

}
