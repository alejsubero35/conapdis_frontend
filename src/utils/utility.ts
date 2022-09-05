import { http} from '@/utils/http';
import { User } from '@/store/interfaces/User';


import sessionModule from '@/store/modules/sessionModule'

export async function fetchUser(): Promise<User> {
    
    const response = await http.get('users/me')
    return (response.data.data as User)
  }


 

  