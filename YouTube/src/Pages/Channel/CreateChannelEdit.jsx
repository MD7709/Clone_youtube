import React, { useState } from 'react';
import './CreateChannelEdit.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateChannelData } from '../../actions/channelUser';
import { login } from '../../actions/auth';

const CreateChannelEdit = ({ setEditChannelBtn }) => {
  const CurrentUser = useSelector(state => state.currentUserReducer);
  const [channelName, setChannelName] = useState(CurrentUser?.result.channelName);
  const [channelId, setChannelId] = useState(CurrentUser?.result.channelId);
  const dispatch = useDispatch();

const handleSubmit = () => {
  if (!channelName) {
    alert("Enter Your name");
  } else if (!channelId) {
    alert("Enter Your id");
  } else {
    console.log('Submitting: ', { channelName, channelId });
    dispatch(updateChannelData(CurrentUser?.result._id, {
      channelName: channelName,
      channelId: channelId
    }));
    setEditChannelBtn(false);
    setTimeout(() => {
      dispatch(login({ email: CurrentUser?.result.email }));
    }, 5000);
  }
};


  return (
    <div className="container_channel_edit">
      <button className="closeBtn" onClick={() => setEditChannelBtn(false)}>X</button>
      <div className="container_channel_edit_2">
        <h1>{CurrentUser?.result.name ? 'Edit' : 'Create'} your channel</h1>
        <div className=''>  
          <div className="form_group">
            <input
              type="text"
              className="form_control"
              placeholder="Enter Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </div>
          <div className="form_group">
            <input
              type="text"
              className="form_control"
              placeholder="Create Channel ID"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              required
            />
          </div>
          <button type="submit" value={"submit"} className="submitBtn" onClick={handleSubmit}>
            {CurrentUser?.result.channelName ? 'Save Changes' : 'Create Channel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelEdit;
