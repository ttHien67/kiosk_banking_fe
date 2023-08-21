import { enviroment } from "../enviroments/enviroment";


export class CommandURL {
    public static SERVICE = enviroment.PROCESS_SERVICE + "/api/banking/service";

    public static EMPLOYEE = enviroment.PROCESS_SERVICE + "/api/banking/employee";

    public static ROLE = enviroment.PROCESS_SERVICE + "/api/banking/role";


}