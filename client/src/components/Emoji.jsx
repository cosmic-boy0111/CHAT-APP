import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
// import Picker from 'emoji-picker-element'

const Emoji = ({show,setMessage}) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMessage((pre)=>{
        return pre+emojiObject.emoji;
    })
    // console.log(emojiObject);
  };

 
  return (
    <div className='emoji_container' id='emoji'>
      <Picker 
        onEmojiClick={onEmojiClick} 
      />
    </div>
  );
};

export default Emoji