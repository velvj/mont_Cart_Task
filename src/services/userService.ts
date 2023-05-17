import { User, UserData } from "../models/user";

class UserService {
  //signup user
  async addUser(payload: any): Promise<UserData> {
    try {
      let result: any = await User.create(payload);
      return result;
    } catch (e) {
      return e;
    }
  }
  //finde user service
  async findUserService(data: any): Promise<UserData> {
    try {
      let result: any = await User.findOne(data);
      return result;
    } catch (e) {
      return e;
    }
  }
  
  //list of users
  async findUsers():Promise<UserData>{
    try{
let result:any=await User.findAll();
return result;
    }catch(e){
      return e
    }
  }
}
export default new UserService();
