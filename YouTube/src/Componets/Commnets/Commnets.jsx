import React, { useState } from 'react';
import './Commnet.css';
import DispalyCommnet from './DispalyCommnet';
import { useSelector } from 'react-redux';

const Comments = () => {
    const CurrentUser = useSelector(state => state.currentUserReducer);
    const [commentText, setCommentText] = useState("");
    const [CommnetList, setCommentList] = useState([
        {
            UserBody: "iamPrinceK",
            UserCommnet: "TVF has won hearts so many times that there is no need to see reviews"
        }
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            const newComment = {
                UserBody: CurrentUser?.result?.name ? CurrentUser.result.name : CurrentUser?.result?.email,
                UserCommnet: commentText
            };
            setCommentList([...CommnetList, newComment]);
            setCommentText("");
        }
    }

    return (
        <>
            <div className="coninater_commnet_section">
                <div className="logo">
                    <span>{CurrentUser?.result?.name
                        ? CurrentUser.result.name.charAt(0).toUpperCase()
                        : CurrentUser?.result?.email.charAt(0).toUpperCase()}</span>
                </div>
                <form action="" className='Commnet_from' onSubmit={handleSubmit}>
                    <div className='Commnet_input_section'>
                        <input
                            type="text"
                            name="Text"
                            id=""
                            placeholder='Add a Comment...'
                            className='Commmnet_input'
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </div>
                    <div className='Commnet_btn'>
                        <button className='Commnet_submit_btn1' type='button' onClick={() => setCommentText("")}>Cancel</button>
                        <button className='Commnet_submit_btn' type='submit'>Comment</button>
                    </div>
                </form>
            </div>

            <div className='Display_comment'>
                {CommnetList.map((comment, index) => (
                    <DispalyCommnet key={index} UserBody={comment.UserBody} UserCommnet={comment.UserCommnet} />
                ))}
            </div>
        </>
    );
}

export default Comments;
