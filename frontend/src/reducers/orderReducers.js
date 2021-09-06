import { ORDER_CREATE_FAIL, ORDER_CREATE_REGUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS } from "../constants/orderConstats";

export const orderReducers=(state={},action)=>{
    switch (action.type) {
        case ORDER_CREATE_REGUEST:
            return{loading:true};
            case ORDER_CREATE_SUCCESS:
                return{loading:false,success:true,order:action.payload};
                case ORDER_CREATE_FAIL:
                    return{loading:false,error:action.payload};
                    case ORDER_CREATE_RESET:
                        return {};
            
    
        default:
    }   return state;
}