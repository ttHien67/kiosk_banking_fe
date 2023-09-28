import { enviroment } from '../enviroments/enviroment';

export class CommandURL {
  public static SERVICE = enviroment.PROCESS_SERVICE + '/api/banking/service';

  public static EMPLOYEE = enviroment.PROCESS_SERVICE + '/api/banking/employee';

  public static ROLE = enviroment.PROCESS_SERVICE + '/api/banking/role';

  public static TICKET = enviroment.PROCESS_SERVICE + '/api/banking/ticket';

  // Login
  public static LOGIN = enviroment.PROCESS_SERVICE + '/api/banking/auth';

  public static SCREEN = enviroment.PROCESS_SERVICE + '/api/banking/screen';

  public static MENU = enviroment.PROCESS_SERVICE + '/api/banking/menu';
}
