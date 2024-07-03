const channelReducers = (states=[], action)=>{
    switch(action.type)
    {
            case "UPDATE_DATA":
            return action.payload;
            default: 
                return states; 

        }
}
export default channelReducers